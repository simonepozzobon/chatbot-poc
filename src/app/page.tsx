import { ChatMessages } from '@/components/ChatMessages';
import { ChatPrompt } from '@/components/ChatPrompt';
import { ConversationItem } from '@/components/ConversationItem';
import { Panel } from '@/components/Panel';
import { MESSAGE_ROLE } from '@/constants/messages';
import { prisma } from '@/lib/prisma';

console.log(process.env.DATABASE_URL);

export const getConversations = async () => {
  const conversations = await prisma.conversation.findMany({
    include: { Message: true },
  });
  return conversations || [];
};

export default async function Home() {
  const conversations = await getConversations();

  const selectedConversation =
    conversations[0]?.Message?.map((message) => {
      console.log(message);
      return {
        role: message.role ?? MESSAGE_ROLE.USER,
        content: message.content,
      };
    }) ?? [];

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
        <ChatMessages messages={selectedConversation} />
        <ChatPrompt />
      </div>
    </div>
  );
}
