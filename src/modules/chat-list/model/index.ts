export type ChatMessage = {
  id: string | number;
  text: string;
  fromMe: boolean;
  time: string; 
};

export type Chat = {
  id: string;
  title: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline?: boolean;
  isBot?: boolean; // true - бот, false или undefined - обычный человек
  messages: ChatMessage[];
};

export const mockChats: Chat[] = [
  // Обычные люди
  {
    id: "1",
    title: "Андрей",
    lastMessage: "Привет! Как дела?",
    lastMessageTime: "10:30",
    unreadCount: 2,
    isOnline: true,
    isBot: false,
    messages: [
      { id: 1, text: "Привет! Как дела?", fromMe: false, time: "10:30" },
      { id: 2, text: "Привет! Всё хорошо, а у тебя?", fromMe: true, time: "10:31" },
      { id: 3, text: "Тоже отлично!", fromMe: false, time: "10:32" },
    ],
  },
  {
    id: "2",
    title: "Работа",
    lastMessage: "Вышли отчёт до 12:00",
    lastMessageTime: "09:15",
    unreadCount: 0,
    isOnline: false,
    isBot: false,
    messages: [
      { id: 1, text: "Вышли отчёт до 12:00", fromMe: false, time: "09:15" },
      { id: 2, text: "Ок, сейчас сделаю", fromMe: true, time: "09:16" },
    ],
  },
  {
    id: "3",
    title: "Мама",
    lastMessage: "Позвони, когда освободишься",
    lastMessageTime: "Вчера",
    unreadCount: 1,
    isOnline: true,
    isBot: false,
    messages: [
      { id: 1, text: "Позвони, когда освободишься", fromMe: false, time: "18:45" },
      { id: 2, text: "Хорошо, мам!", fromMe: true, time: "18:46" },
    ],
  },
  {
    id: "4",
    title: "Друзья",
    lastMessage: "Сегодня встречаемся в 7?",
    lastMessageTime: "Пн",
    unreadCount: 0,
    isOnline: false,
    isBot: false,
    messages: [
      { id: 1, text: "Сегодня встречаемся в 7?", fromMe: false, time: "Пн 15:00" },
      { id: 2, text: "Да, я буду!", fromMe: true, time: "Пн 15:01" },
    ],
  },
  // Боты
  {
    id: "5",
    title: "GPT-3 Bot",
    lastMessage: "Чем могу помочь?",
    lastMessageTime: "11:00",
    unreadCount: 0,
    isOnline: true,
    isBot: true,
    messages: [
      { id: 1, text: "Привет, бот!", fromMe: true, time: "10:59" },
      { id: 2, text: "Чем могу помочь?", fromMe: false, time: "11:00" },
    ],
  },
  {
    id: "6",
    title: "WeatherBot",
    lastMessage: "Сегодня ожидается дождь и +18°C.",
    lastMessageTime: "08:20",
    unreadCount: 1,
    isOnline: true,
    isBot: true,
    messages: [
      { id: 1, text: "Какая погода сегодня?", fromMe: true, time: "08:19" },
      { id: 2, text: "Сегодня ожидается дождь и +18°C.", fromMe: false, time: "08:20" },
    ],
  },
  {
    id: "7",
    title: "NewsBot",
    lastMessage: "Главные новости дня: ...",
    lastMessageTime: "07:00",
    unreadCount: 0,
    isOnline: false,
    isBot: true,
    messages: [
      { id: 1, text: "Расскажи новости", fromMe: true, time: "07:00" },
      { id: 2, text: "Главные новости дня: ...", fromMe: false, time: "07:00" },
    ],
  },
];
