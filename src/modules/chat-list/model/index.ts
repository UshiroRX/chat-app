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
