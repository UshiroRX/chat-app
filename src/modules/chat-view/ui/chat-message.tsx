import { themeClasses } from "../../../shared/config/theme";

interface ChatMessageProps {
  text: string;
  time: string;
  fromMe?: boolean;
}

export const ChatMessage = ({ text, fromMe, time }: ChatMessageProps) => (
  <div
    className={`max-w-[60%] px-4 py-2 text-sm flex flex-col relative${
      fromMe
        ? " ml-auto " + themeClasses.messageOut
        : " mr-auto " + themeClasses.messageIn
    }`}
    style={{ wordBreak: "break-word" }}
  >
    <span>{text}</span>
    <span className="absolute right-2 bottom-1 text-xs text-gray-800 select-none">{time}</span>
  </div>
);
