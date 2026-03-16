import 'dotenv/config';
import { client, startDiscordBot } from './bot.js';
import { startWebServer } from './web.js';

async function start() {
  const enableDiscord = process.env.ENABLE_DISCORD !== 'false';
  const enableWeb = process.env.ENABLE_WEB === 'true';

  console.log('Starting OpenGravity...');

  if (enableDiscord) {
    console.log('[DISCORD] Activado');
    startDiscordBot();
  } else {
    console.log('[DISCORD] Desactivado');
  }

  const webServer = enableWeb ? startWebServer() : null;
  if (!enableWeb) {
    console.log('[WEB] Desactivado');
  }

  const stop = () => {
    console.log('\nStopping OpenGravity...');

    if (webServer) {
      webServer.close(() => {
        console.log('[WEB] Servidor detenido.');
      });
    }

    if (enableDiscord) {
      client.destroy();
      console.log('[DISCORD] Bot detenido.');
    }

    process.exit();
  };

  process.on('SIGINT', stop);
  process.on('SIGTERM', stop);
}

start().catch(console.error);
