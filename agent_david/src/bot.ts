import { Client, GatewayIntentBits, Partials, Events } from 'discord.js';
import { agentLoop } from './agent.js';

const token = process.env.DISCORD_BOT_TOKEN;
const allowedUserIdsStr = process.env.DISCORD_ALLOWED_USER_IDS || '';
const allowedUserIds = allowedUserIdsStr.split(',').map(id => id.trim());

export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
  ],
  partials: [Partials.Channel, Partials.Message]
});

client.once(Events.ClientReady, readyClient => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on(Events.MessageCreate, async (message) => {
  console.log(`[DEBUG] Received a message from ${message.author.tag} (ID: ${message.author.id}): "${message.content}"`);

  // Ignore bots
  if (message.author.bot) {
    console.log(`[DEBUG] Ignored message: author is a bot.`);
    return;
  }

  const userId = message.author.id;
  
  // Whitelist check
  if (!allowedUserIds.includes(userId)) {
    console.warn(`[DEBUG] Unauthorized access attempt from Discord user ID: ${userId}. Allowed IDs: ${allowedUserIds}`);
    return;
  }

  const text = message.content;
  if (!text.trim()) {
    console.log(`[DEBUG] Ignored message: text is empty.`);
    return;
  }

  console.log(`[DEBUG] Valid message received from authorized user. Sending to agentLoop...`);

  try {
    // Show typing indicator
    await message.channel.sendTyping();
    
    const replyText = await agentLoop(userId, text);
    
    // Discord has a 2000 character limit per message, but for simplicity we reply directly.
    // If output is very long, it should ideally be chunked here.
    await message.reply(replyText);
  } catch (error: any) {
    console.error("Agent error:", error);
    await message.reply("An error occurred during processing.");
  }
});

// Helper validation function exported just in case
export function startDiscordBot() {
  if (!token) {
    throw new Error('DISCORD_BOT_TOKEN is missing in the environment');
  }
  client.login(token).catch(console.error);
}
