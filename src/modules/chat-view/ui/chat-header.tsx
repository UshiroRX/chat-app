import { themeClasses } from "../../../shared/config/theme";

interface ChatHeaderProps {
  title: string;
  isOnline?: boolean;
  isBot?: boolean;
}

export const ChatHeader = ({ title, isOnline, isBot }: ChatHeaderProps) => (
  <div className={themeClasses.chatHeader}>
    <div className="flex items-center">
      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-lg font-bold text-gray-600 mr-10">
        {title[0]}
      </div>
      <div className="pl-3">
        <div className="font-medium text-gray-900 flex items-center gap-2">
          {title}
          {isBot && (
            <span className="ml-2 px-2 py-0.5 bg-yellow-200 text-yellow-800 text-xs rounded-full">бот</span>
          )}
        </div>
        <div className="text-xs text-gray-400 flex items-center">
          {isOnline && (
            <span className={themeClasses.onlineIndicator + " mr-1"} />
          )} {isOnline ? "в сети" : "не в сети"}
        </div>
      </div>
    </div>
  </div>
);
