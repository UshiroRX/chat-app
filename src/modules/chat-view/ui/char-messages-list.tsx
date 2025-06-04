import { useEffect, useRef } from "react";
import { ChatMessage } from "./chat-message";
import type { ChatMessage as ChatMessageType } from "../../chat-list/model";

interface ChatMessagesListProps {
  messages: ChatMessageType[];
}

export const ChatMessagesList = ({ messages }: ChatMessagesListProps) => {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-8">
      {messages.map((msg) => (
        <ChatMessage
          key={msg.id}
          text={msg.text}
          fromMe={msg.fromMe}
          time={msg.time}
        />
      ))}
      <div ref={bottomRef} />
    </div>
  );
};
