import express from 'express';
import mongoose from 'mongoose';
import apiRoutes from './routes';

const app = express();
const port = Number(process.env.PORT) || 8000;
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', baseUrl });
});

app.use('/api', apiRoutes);

app.use((error: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(error);
  res.status(500).json({ error: 'Internal server error' });
});

const startServer = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB at', mongoUri);

    app.listen(port, () => {
      console.log(`Backend listening at ${baseUrl}`);
    });
  } catch (error) {
    console.error('Failed to start backend service:', error);
    process.exit(1);
  }
};

void startServer();
