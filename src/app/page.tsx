import { ChatPrompt } from '@/components/ChatPrompt';
import { Panel } from '@/components/Panel';

console.log(process.env.DATABASE_URL);

export default function Home() {
  return (
    <div>
      <div className="flex h-screen flex-col gap-1 p-4">
        <Panel className="grow">Messaggi</Panel>
        <ChatPrompt />
      </div>
    </div>
  );
}
