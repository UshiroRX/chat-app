import { useState, useEffect } from "react";
import { ChatList } from "../../chat-list/ui/chat-list";
import { ChatView } from "../../chat-view/ui/chat-view";
import type { Chat } from "../../chat-list/model";
import { Header } from "../../../shared/ui/header";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const LOCAL_STORAGE_KEY = "chatAppData";

export const ChatLayout = () => {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const selectedChat = chats.find((chat) => chat.id === selectedChatId) || null;

  useEffect(() => {
    const savedChats = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedChats) {
      setChats(JSON.parse(savedChats));
    } else {
      setChats([
        {
          id: "default-bot",
          title: "GPT-3 Bot",
          lastMessage: "Привет! Чем могу помочь?",
          lastMessageTime: "",
          unreadCount: 0,
          isOnline: true,
          isBot: true,
          messages: [],
        },
      ]);
    }
  }, []);

  useEffect(() => {
    if (chats.length > 0) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(chats));
    }
  }, [chats]);

  const sendMessageMutation = useMutation({
    mutationFn: async (messagePayload: {
      messages: { role: string; content: string }[];
    }) => {
      const response = await axios.post("/api/gpt", messagePayload);
      return response.data.reply;
    },
    onMutate: (messagePayload) => {
      const currentTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      const newMessage = {
        id: Date.now(),
        text: messagePayload.messages[messagePayload.messages.length - 1]
          .content,
        fromMe: true,
        time: currentTime,
      };

      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === selectedChatId
            ? { ...chat, messages: [...chat.messages, newMessage] }
            : chat
        )
      );

      if (selectedChat?.isBot) {
        setIsBotTyping(true);
      }
    },
    onSuccess: (reply) => {
      const replyMessage = {
        id: Date.now() + 1,
        text: reply,
        fromMe: false,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === selectedChatId
            ? { ...chat, messages: [...chat.messages, replyMessage] }
            : chat
        )
      );
    },
    onError: (error) => {
      console.error("GPT error:", error);
      const errorMessage = {
        id: Date.now() + 1,
        text: "Ошибка при получении ответа от бота.",
        fromMe: false,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === selectedChatId
            ? { ...chat, messages: [...chat.messages, errorMessage] }
            : chat
        )
      );
    },
    onSettled: () => {
      setIsBotTyping(false);
    },
  });

  const handleSend = async (text: string) => {
    if (!selectedChat?.isBot) {
      const currentTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      const newMessage = {
        id: Date.now(),
        text,
        fromMe: true,
        time: currentTime,
      };
      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === selectedChatId
            ? { ...chat, messages: [...chat.messages, newMessage] }
            : chat
        )
      );
      return;
    }

    const currentChat = chats.find((c) => c.id === selectedChatId);
    if (!currentChat) {
      return;
    }

    const gptMessages = [
      ...currentChat.messages,
      {
        id: Date.now(),
        text: text,
        fromMe: true,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ].map((msg) => ({
      role: msg.fromMe ? "user" : "assistant",
      content: msg.text,
    }));

    sendMessageMutation.mutate({ messages: gptMessages });
  };

  const createBotChat = () => {
    const newBotChat = {
      id: `bot-${Date.now()}`,
      title: "Новый чат с ботом",
      lastMessage: "",
      lastMessageTime: "",
      unreadCount: 0,
      isOnline: true,
      isBot: true,
      messages: [],
    };
    setChats((prevChats) => [newBotChat, ...prevChats]);
    setSelectedChatId(newBotChat.id);
  };

  const createPersonChat = () => {
    const personName = prompt("Введите имя человека:") || "Новый собеседник"; // Simple prompt for now
    const newPersonChat = {
      id: `person-${Date.now()}`,
      title: personName,
      lastMessage: "",
      lastMessageTime: "",
      unreadCount: 0,
      isOnline: true,
      isBot: false,
      messages: [],
    };
    setChats((prevChats) => [newPersonChat, ...prevChats]);
    setSelectedChatId(newPersonChat.id);
  };

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 min-h-0">
        <div className="flex flex-col gap-1">
          <button
            onClick={createBotChat}
            className="p-2 m-2 bg-white text-black border border-black rounded hover:bg-black hover:text-white transition-colors duration-300"
          >
            Создать чат с ботом
          </button>
          <button
            onClick={createPersonChat}
            className="p-2 m-2 bg-white text-black border border-black rounded hover:bg-black hover:text-white transition-colors duration-300"
          >
            Создать чат с человеком
          </button>

          <ChatList
            selectedChatId={selectedChatId ?? ""}
            onSelectChat={setSelectedChatId}
            chats={chats}
          />
        </div>
        <div className="flex-1 min-w-0">
          {selectedChat ? (
            <ChatView
              chat={selectedChat}
              messages={selectedChat.messages}
              onSend={handleSend}
              isBotTyping={
                (isBotTyping && selectedChat.isBot) ||
                sendMessageMutation.isPending
              }
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400 text-lg">
              Выберите чат
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
