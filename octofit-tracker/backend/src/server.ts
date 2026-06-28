import express from 'express';
import mongoose from 'mongoose';
import apiRoutes from './routes';

const app = express();
const port = 8000;
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';
const allowedOrigins = new Set([
  apiBaseUrl,
  codespaceName ? `https://${codespaceName}-5173.app.github.dev` : 'http://localhost:5173',
]);

app.use(express.json());

app.use((req, res, next) => {
  const origin = req.header('Origin');

  if (origin && allowedOrigins.has(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Vary', 'Origin');
  }

  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');

  if (req.method === 'OPTIONS') {
    res.sendStatus(204);
    return;
  }

  next();
});

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', apiBaseUrl });
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
      console.log(`Backend listening at ${apiBaseUrl}`);
    });
  } catch (error) {
    console.error('Failed to start backend service:', error);
    process.exit(1);
  }
};

void startServer();