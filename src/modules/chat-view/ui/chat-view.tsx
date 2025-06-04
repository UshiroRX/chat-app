import { ChatHeader } from "./chat-header";
import { ChatInput } from "./chat-input";
import { ChatMessagesList } from "./char-messages-list";
import type {
  Chat,
  ChatMessage as ChatMessageType,
} from "../../chat-list/model";

interface ChatViewProps {
  chat: Chat;
  messages: ChatMessageType[];
  onSend: (text: string) => void;
}

export const ChatView = ({ chat, messages, onSend }: ChatViewProps) => {
  return (
    <div className="flex flex-col h-full bg-gray-50">
      <ChatHeader title={chat.title} isOnline={chat.isOnline} />
      <ChatMessagesList messages={messages} />
      <ChatInput onSend={onSend} />
    </div>
  );
};
