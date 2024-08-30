import { ChatMessages } from '@/components/ChatMessages';
import { ChatPrompt } from '@/components/ChatPrompt';
import { ConversationItem } from '@/components/ConversationItem';
import { CreateConversationButton } from '@/components/CreateConversationButton';
import { Panel } from '@/components/Panel';
import { prisma } from '@/lib/prisma';
import { NextApiRequest } from 'next';
import { redirect } from 'next/navigation';

export type ConversationDetailsProps = {
  params: {
    conversationId: string;
  };
};

export const getConversations = async () => {
  const conversations = await prisma.conversation.findMany({
    include: { Message: true },
  });
  return conversations || [];
};

export default async function ConversationDetails({ params }: ConversationDetailsProps) {
  const { conversationId } = params;
  const conversations = await getConversations();

  const selectedConversation = conversations.find((conversation) => conversation.id === conversationId);

  if (!selectedConversation) {
    return redirect('/404');
  }

  return (
    <div className="flex h-screen">
      <div className="flex h-screen flex-col py-4 pl-4">
        <Panel style={{ minWidth: 200 }}>
          {conversations.map((conversation) => (
            <ConversationItem
              key={conversation.id}
              name={conversation.name}
              createdAt={conversation.createdAt}
              id={conversation.id}
            />
          ))}
        </Panel>
        <CreateConversationButton />
      </div>
      <div className="flex h-screen w-full flex-col gap-1 p-4">
        <ChatMessages messages={selectedConversation?.Message ?? []} conversationId={conversationId} />
        <ChatPrompt conversationId={conversationId} />
      </div>
    </div>
  );
}
