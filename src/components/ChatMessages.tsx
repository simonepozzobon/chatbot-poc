'use client';

import { useMessages } from '@/hooks/useMessages';
import { ChatMessage } from './ChatMessage';
import { Panel } from './Panel';
import { Message } from '@prisma/client';

export type ChatMessagesProps = {
  messages: Message[];
  conversationId: string;
};

export const ChatMessages = ({ messages, conversationId }: ChatMessagesProps) => {
  const { data } = useMessages({ conversationId, initialData: messages });
  return (
    <Panel className="flex grow flex-col gap-2 overflow-y-scroll p-2">
      {data?.messages?.map((message, index) => <ChatMessage key={index} message={message} />)}
    </Panel>
  );
};
