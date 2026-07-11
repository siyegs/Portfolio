import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { Readable } from 'node:stream';
import { streamChat } from './api/chat-core';

// Dev-only middleware: exposes POST /api/chat during `npm run dev` so the
// Interview Me chat works locally with no separate server. The GROQ_API_KEY
// stays on the server side and is never shipped to the browser.
function interviewApi(env: Record<string, string>): Plugin {
  return {
    name: 'interview-chat-api',
    configureServer(server) {
      server.middlewares.use('/api/chat', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end('Method Not Allowed');
          return;
        }
        try {
          const chunks: Buffer[] = [];
          for await (const chunk of req) chunks.push(chunk as Buffer);
          const body = JSON.parse(Buffer.concat(chunks).toString('utf-8') || '{}');

          const upstream = await streamChat(body, env.GROQ_API_KEY);
          res.statusCode = upstream.status;
          upstream.headers.forEach((value, key) => res.setHeader(key, value));

          if (upstream.body) {
            Readable.fromWeb(upstream.body as never).pipe(res);
          } else {
            res.end();
          }
        } catch (err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Chat proxy failed.', detail: String(err) }));
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react(), interviewApi(env)],
    base: '/',
  };
});
