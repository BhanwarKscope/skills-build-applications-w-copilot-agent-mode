"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
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
app.use(express_1.default.json());
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
app.use('/api', routes_1.default);
app.use((error, _req, res, _next) => {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
});
const startServer = async () => {
    try {
        await mongoose_1.default.connect(mongoUri);
        console.log('Connected to MongoDB at', mongoUri);
        app.listen(port, () => {
            console.log(`Backend listening at ${apiBaseUrl}`);
        });
    }
    catch (error) {
        console.error('Failed to start backend service:', error);
        process.exit(1);
    }
};
void startServer();
