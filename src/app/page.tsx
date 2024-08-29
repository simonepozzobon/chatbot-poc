import { ChatMessages } from '@/components/ChatMessages';
import { ChatPrompt } from '@/components/ChatPrompt';
import { ConversationItem } from '@/components/ConversationItem';
import { Panel } from '@/components/Panel';
import { MESSAGE_ROLE } from '@/constants/messages';
import { prisma } from '@/lib/prisma';

export const getConversations = async () => {
  const conversations = await prisma.conversation.findMany({
    include: { Message: true },
  });
  return conversations || [];
};

export default async function Home() {
  const conversations = await getConversations();

  const selectedConversation = conversations[0];

  return (
    <div className="flex h-screen">
      <div className="h-screen py-4 pl-4">
        <Panel>
          {conversations.map((conversation) => (
            <ConversationItem key={conversation.id} name={conversation.name} createdAt={conversation.createdAt} />
          ))}
        </Panel>
      </div>
      <div className="flex h-screen w-full flex-col gap-1 p-4">
        <ChatMessages messages={selectedConversation?.Message ?? []} conversationId={selectedConversation.id} />
        <ChatPrompt conversationId={selectedConversation.id} />
      </div>
    </div>
  );
}
