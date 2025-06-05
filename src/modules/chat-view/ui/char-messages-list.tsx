import { useEffect, useRef } from "react";
import { ChatMessage } from "./chat-message";
import type { ChatMessage as ChatMessageType } from "../../chat-list/model";

interface ChatMessagesListProps {
  messages: ChatMessageType[];
  isBot?: boolean;
  isBotTyping?: boolean;
}

export const ChatMessagesList = ({
  messages,
  isBot,
  isBotTyping,
}: ChatMessagesListProps) => {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isBotTyping]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-2 items-end">
      {messages.map((msg, idx) => (
        <div
          key={msg.id}
          className={msg.fromMe ? "self-end" : "self-start"}
          style={{ marginBottom: idx === messages.length - 1 ? 0 : "10px" }}
        >
          <ChatMessage
            text={msg.text}
            fromMe={msg.fromMe}
            time={msg.time}
            isBot={!msg.fromMe && isBot}
          />
        </div>
      ))}
      {isBotTyping && (
        <div className="self-start">
          <ChatMessage text="Печатает..." fromMe={false} time="" isBot={true} />
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  );
};
