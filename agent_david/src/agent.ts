import { Groq } from 'groq-sdk';
import { saveMessage } from './db.js';
import { buildAgentMessages } from './messageBuilder.js';
import { toolsDefinitions, executeTool } from './tools/index.js';

const MAX_ITERATIONS = 3;
const FAST_MODEL = process.env.GROQ_MODEL || 'llama-3.1-8b-instant';

export async function agentLoop(userId: string, userMessage: string): Promise<string> {
  const groqApiKey = process.env.GROQ_API_KEY;
  if (!groqApiKey) throw new Error('GROQ_API_KEY is missing');

  const groq = new Groq({ apiKey: groqApiKey });

  saveMessage(userId, 'user', userMessage);

  const messages: any[] = buildAgentMessages(userId);

  let iteration = 0;

  while (iteration < MAX_ITERATIONS) {
    iteration++;

    try {
      const response = await groq.chat.completions.create({
        messages,
        model: FAST_MODEL,
        tools: toolsDefinitions,
        tool_choice: 'auto',
        temperature: 0.2
      });

      const messageContent = response.choices[0]?.message;
      if (!messageContent) {
        throw new Error('No message received from LLM.');
      }

      const { content, tool_calls } = messageContent;

      messages.push({
        role: messageContent.role,
        content: messageContent.content,
        tool_calls: messageContent.tool_calls
      });

      if (tool_calls && tool_calls.length > 0) {
        for (const toolCall of tool_calls) {
          const functionName = toolCall.function.name;
          const args = JSON.parse(toolCall.function.arguments || '{}');

          let result;
          try {
            result = await executeTool(functionName, args);
          } catch (error: any) {
            result = `Error executing tool: ${error.message}`;
          }

          messages.push({
            tool_call_id: toolCall.id,
            role: 'tool',
            name: functionName,
            content: typeof result === 'string' ? result : JSON.stringify(result)
          });
        }

        continue;
      }

      if (content) {
        saveMessage(userId, 'assistant', content);
        return content;
      }
    } catch (error: any) {
      console.error('Error with Groq API:', error.message);

      const openRouterKey = process.env.OPENROUTER_API_KEY;
      if (openRouterKey) {
        console.log('Attempting OpenRouter fallback...');

        try {
          const fallbackResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${openRouterKey}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              model: process.env.OPENROUTER_MODEL || 'openrouter/free',
              messages,
              tools: toolsDefinitions,
              temperature: 0.2
            })
          });

          if (!fallbackResponse.ok) {
            throw new Error(`OpenRouter Error: ${fallbackResponse.statusText}`);
          }

          const fallbackData = await fallbackResponse.json() as any;
          const messageContent = fallbackData.choices[0]?.message;
          if (!messageContent) {
            throw new Error('No message from OpenRouter.');
          }

          const { content, tool_calls } = messageContent;

          messages.push({
            role: messageContent.role,
            content: messageContent.content,
            tool_calls: messageContent.tool_calls
          });

          if (tool_calls && tool_calls.length > 0) {
            for (const toolCall of tool_calls) {
              const functionName = toolCall.function.name;
              const args = JSON.parse(toolCall.function.arguments || '{}');

              let result;
              try {
                result = await executeTool(functionName, args);
              } catch (toolError: any) {
                result = `Error executing tool: ${toolError.message}`;
              }

              messages.push({
                tool_call_id: toolCall.id,
                role: 'tool',
                name: functionName,
                content: typeof result === 'string' ? result : JSON.stringify(result)
              });
            }

            continue;
          }

          if (content) {
            saveMessage(userId, 'assistant', content);
            return content;
          }
        } catch (fallbackError: any) {
          console.error('Error with OpenRouter fallback:', fallbackError.message);
        }
      }

      const errorMessage = 'Estoy teniendo dificultades para responder con claridad en este momento.';
      saveMessage(userId, 'assistant', errorMessage);
      return errorMessage;
    }
  }

  const limitMessage = 'Necesito parar un momento para no responder de forma precipitada. Si quieres, reformula la pregunta y seguimos.';
  saveMessage(userId, 'assistant', limitMessage);
  return limitMessage;
}
