import { getMessages } from './db.js';
import { styleExamples } from './examples.js';
import { systemPersona } from './persona.js';

export function buildAgentMessages(userId: string) {
  const history = getMessages(userId, 4);

  return [
    {
      role: 'system',
      content: systemPersona
    },
    ...styleExamples,
    ...history.map((message) => ({
      role: message.role as any,
      content: message.content
    }))
  ];
}
