import { ChatPrompt } from "@/components/ChatPrompt";
import { Panel } from "@/components/Panel";

export default function Home() {
  return (
    <div className="p-4 flex flex-col gap-1 h-screen">
      <Panel className="grow">
        Messaggi
      </Panel>
      <ChatPrompt />
    </div>
  );
}
