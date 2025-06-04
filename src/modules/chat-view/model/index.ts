// model/index.ts
export const mockChats = [
  {
    id: "1",
    title: "Андрей",
    isOnline: true,
    messages: [
      { id: 1, text: "Привет!", fromMe: false },
      { id: 2, text: "Привет, как дела?", fromMe: true },
    ],
  },
  {
    id: "2",
    title: "Катя",
    isOnline: false,
    messages: [
      { id: 3, text: "Ты где?", fromMe: false },
    ],
  },
];
