import { themeClasses } from "../../../shared/config/theme";
import type { Chat } from "../model";

interface ChatItemProps {
  chat: Chat;
  onClick?: () => void;
  selected?: boolean;
}

export const ChatItem = ({ chat, onClick, selected }: ChatItemProps) => {
  return (
    <div
      className={`flex items-center px-3 py-3 cursor-pointer border-b border-gray-100 transition bg-white hover:bg-gray-50 ${
        selected ? "bg-gray-100" : ""
      }`}
      onClick={onClick}
    >
      <div className="relative mr-3 ">
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-lg font-bold text-gray-600 ">
          {chat.title[0]}
        </div>
        {chat.isOnline && (
          <span
            className={themeClasses.onlineIndicator}
            style={{ position: "absolute", bottom: 2, right: 2 }}
          />
        )}
      </div>
      <div className="flex-1 pl-3 min-w-0">
        <div className="flex justify-between items-center">
          <span className="font-medium text-gray-900 truncate flex items-center gap-2">
            {chat.title}
            {chat.isBot && (
              <span className="ml-2 px-2 py-0.5 bg-yellow-200 text-yellow-800 text-xs rounded-full">бот</span>
            )}
          </span>
          <span className="text-xs text-gray-400 ml-2 whitespace-nowrap">
            {chat.lastMessageTime}
          </span>
        </div>
        <div className="flex justify-between items-center mt-1">
          <span className="text-sm text-gray-500 truncate">
            {chat.lastMessage}
          </span>
          {chat.unreadCount > 0 && (
            <span className="ml-2 bg-blue-500 text-white text-xs rounded-full px-2 py-0.5">
              {chat.unreadCount}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
