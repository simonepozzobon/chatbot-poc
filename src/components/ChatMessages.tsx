import { ChatMessage, Message } from './ChatMessage';
import { Panel } from './Panel';

export type ChatMessagesProps = {
  messages: Message[];
};

export const ChatMessages = ({ messages }: ChatMessagesProps) => {
  return (
    <Panel className="flex grow flex-col gap-2 p-2">
      {messages?.map((message, index) => <ChatMessage key={index} message={message} />)}
    </Panel>
  );
};
