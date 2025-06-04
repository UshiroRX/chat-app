import { themeClasses } from "../../../shared/config/theme";
import { mockChats } from "../model";
import { ChatItem } from "./chat-item";
import { ChatFinder } from "./chat-finder";

export const ChatList = () => {
  // Для примера выбран первый чат
  const selectedChatId = mockChats[0]?.id;

  return (
    <aside className={themeClasses.sidebar}>
      <div className="flex-shrink-0 px-4 py-3 border-b border-gray-200">
        <ChatFinder />
      </div>
      <div className="flex-1 overflow-y-auto">
        {mockChats.map((chat) => (
          <ChatItem
            key={chat.id}
            chat={chat}
            selected={chat.id === selectedChatId}
          />
        ))}
      </div>
    </aside>
  );
};
