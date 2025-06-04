import { useState } from "react";
import { ChatList } from "../../chat-list/ui/chat-list";
import { ChatView } from "../../chat-view/ui/chat-view";
import { mockChats } from "../../chat-list/model";
import type { Chat } from "../../chat-list/model";
import { Header } from "../../../shared/ui/header";

export const ChatLayout = () => {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [chats, setChats] = useState<Chat[]>(mockChats);
  const selectedChat = chats.find((chat) => chat.id === selectedChatId) || null;

  const handleSend = (text: string) => {
    setChats((chats) =>
      chats.map((chat) =>
        chat.id === selectedChatId
          ? {
              ...chat,
              messages: [
                ...chat.messages,
                {
                  id: Date.now(),
                  text,
                  fromMe: true,
                  time: new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  }),
                },
              ],
            }
          : chat
      )
    );
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
