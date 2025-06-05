import { themeClasses } from "../../../shared/config/theme";

interface ChatMessageProps {
  text: string;
  time: string;
  fromMe?: boolean;
  isBot?: boolean;
}

export const ChatMessage = ({ text, fromMe, time, isBot }: ChatMessageProps) => (
  <div
    className={`max-w-[60%] px-4 py-2 text-sm flex flex-col relative${
      fromMe
        ? " ml-auto " + themeClasses.messageOut
        : isBot
        ? " mr-auto bg-yellow-100 border border-yellow-300 text-yellow-900 rounded-2xl rounded-bl-md shadow-sm"
        : " mr-auto " + themeClasses.messageIn
    }`}
    style={{ wordBreak: "break-word" }}
  >
    <span className="flex items-center gap-1">
      {isBot && (
        <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M8 15h8M9 9h.01M15 9h.01" /></svg>
      )}
      {text}
    </span>
    <span className="absolute right-2 bottom-1 text-xs text-gray-800 select-none">{time}</span>
  </div>
);
