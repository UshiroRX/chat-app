import { useState } from "react";
import { ChatList } from "../../chat-list/ui/chat-list";
import { ChatView } from "../../chat-view/ui/chat-view";
import { mockChats } from "../../chat-list/model";
import type { Chat } from "../../chat-list/model";
import { Header } from "../../../shared/ui/header";
import axios from "axios";


export const ChatLayout = () => {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [chats, setChats] = useState<Chat[]>(mockChats);
  const selectedChat = chats.find((chat) => chat.id === selectedChatId) || null;

  const handleSend = async (text: string) => {
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

    if (!selectedChat?.isBot) return;

    try {
      const currentChat = chats.find((c) => c.id === selectedChatId);
      if (!currentChat) return;

      const gptMessages = [...currentChat.messages, newMessage].map((msg) => ({
        role: msg.fromMe ? "user" : "assistant",
        content: msg.text,
      }));
      const response = await axios.post("/api/gpt", {
        messages: gptMessages,
      });

      const replyMessage = {
        id: Date.now() + 1,
        text: response.data.reply,
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
    } catch (error) {
      console.error("GPT error:", error);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 min-h-0">
        <ChatList
          selectedChatId={selectedChatId ?? ""}
          onSelectChat={setSelectedChatId}
        />
        <div className="flex-1 min-w-0">
          {selectedChat ? (
            <ChatView
              chat={selectedChat}
              messages={selectedChat.messages}
              onSend={handleSend}
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
