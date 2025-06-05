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
  isBotTyping?: boolean;
}

export const ChatView = ({
  chat,
  messages,
  onSend,
  isBotTyping,
}: ChatViewProps) => {
  return (
    <div className="flex flex-col h-full bg-gray-50">
      <ChatHeader
        title={chat.title}
        isOnline={chat.isOnline}
        isBot={chat.isBot}
      />
      <ChatMessagesList
        messages={messages}
        isBot={chat.isBot}
        isBotTyping={isBotTyping}
      />
      <ChatInput onSend={onSend} disabled={isBotTyping} />
    </div>
  );
};
