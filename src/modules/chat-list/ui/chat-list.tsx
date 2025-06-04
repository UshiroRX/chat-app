// src/modules/chat-list/ui/chat-list.tsx
import { useState } from "react";
import { themeClasses } from "../../../shared/config/theme";
import { mockChats } from "../model";
import { ChatItem } from "./chat-item";
import { ChatFinder } from "./chat-finder";

interface ChatListProps {
  selectedChatId: string;
  onSelectChat: (id: string) => void;
}

export const ChatList = ({ selectedChatId, onSelectChat }: ChatListProps) => {
  const [search, setSearch] = useState("");

  const filteredChats = mockChats.filter((chat) =>
    chat.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <aside className={themeClasses.sidebar}>
      <div className="flex-shrink-0 px-4 py-3 border-b border-gray-200">
        <ChatFinder value={search} onChange={setSearch} />
      </div>
      <div className="flex-1 overflow-y-auto">
        {filteredChats.map((chat) => (
          <ChatItem
            key={chat.id}
            chat={chat}
            selected={chat.id === selectedChatId}
            onClick={() => onSelectChat(chat.id)}
          />
        ))}
        {filteredChats.length === 0 && (
          <div className="text-center text-gray-400 py-8">Чаты не найдены</div>
        )}
      </div>
    </aside>
  );
};
