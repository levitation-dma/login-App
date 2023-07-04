import { createServer } from 'vite';
import { ViteDevServer } from 'vite';
import express, { Request, Response } from 'express';
import { login } from './src/api/login';

const startServer = async () => {
  const app = express();
  const server = await createServer({
    server: { middlewareMode: 'ssr', watch: { usePolling: true } },
  }) as ViteDevServer;

  // Mock API endpoint
  app.use(express.json());
  app.post('/api/login', login);

  app.use(server.middlewares);

  app.use('*', (req: Request, res: Response) => {
    res.sendFile(server.config.root + '/index.html');
  });

  app.listen(5173, () => {
    console.log('Server running at http://localhost:5173');
  });
};

startServer();
