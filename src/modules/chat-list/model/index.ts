export type Chat = {
  id: string;
  title: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline?: boolean;
};

export const mockChats: Chat[] = [
  {
    id: "1",
    title: "Андрей",
    lastMessage: "Привет! Как дела?",
    lastMessageTime: "10:30",
    unreadCount: 2,
    isOnline: true,
  },
  {
    id: "2",
    title: "Работа",
    lastMessage: "Вышли отчёт до 12:00",
    lastMessageTime: "09:15",
    unreadCount: 0,
    isOnline: false,
  },
  {
    id: "3",
    title: "Мама",
    lastMessage: "Позвони, когда освободишься",
    lastMessageTime: "Вчера",
    unreadCount: 1,
    isOnline: true,
  },
  {
    id: "4",
    title: "Друзья",
    lastMessage: "Сегодня встречаемся в 7?",
    lastMessageTime: "Пн",
    unreadCount: 0,
    isOnline: false,
  },
];
