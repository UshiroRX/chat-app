import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import router from './src/modules/chat-view/api/bot.js'; // не забудь .js в пути!

// Обработка __dirname (в ESM нет напрямую)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// API роут
app.use('/api/gpt', router); // уточняем путь: теперь bot.js обрабатывает ЧИСТО /

// Раздача React билда из папки dist
app.use(express.static(path.join(__dirname, 'dist')));

// SPA fallback: всё, что не API — отдаём index.html
app.get('/{*any}', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});



// Запуск сервера
app.listen(PORT, () => {
  console.log(`🚀 Сервер работает на http://localhost:${PORT}`);
});
