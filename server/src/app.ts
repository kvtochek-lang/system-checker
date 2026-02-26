import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRouter from './routes/api';
import os from 'os';

dotenv.config();

const app = express();
// Явно преобразуем PORT в число
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;

// Получаем IP сервера
const getLocalIP = (): string => {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name] || []) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return '0.0.0.0';
};

const localIP = getLocalIP();
console.log('🌐 Локальный IP сервера:', localIP);

// Разрешаем запросы с любых источников (для разработки)
app.use(cors({
  origin: '*', // Внимание: в продакшене замените на конкретные домены!
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Логирование запросов
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url} from ${req.ip}`);
  if (req.method === 'POST') {
    console.log('Body:', req.body);
  }
  next();
});

// API маршруты
app.use('/api', apiRouter);

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    message: 'Server is running',
    ip: localIP,
    port: PORT
  });
});

// Обработка 404
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Обработка ошибок
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: err.message 
  });
});

// Слушаем на всех интерфейсах
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📡 Local: http://localhost:${PORT}`);
  console.log(`🌍 Network: http://${localIP}:${PORT}`);
  console.log(`🔍 Health check: http://${localIP}:${PORT}/health`);
  console.log(`📚 API: http://${localIP}:${PORT}/api`);
});

export default app;
