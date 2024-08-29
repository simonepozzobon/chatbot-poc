export type ConversationItemProps = {
  name: string | null;
  createdAt: Date;
};

export const ConversationItem = ({ name, createdAt }: ConversationItemProps) => {
  return (
    <div className="flex items-center gap-4 rounded px-2 py-1 hover:bg-slate-200">
      <div>{name || createdAt.toISOString()}</div>
      <div className="flex">
        <button className="rounded bg-primary/20 p-2 text-xs">Open</button>
      </div>
    </div>
  );
};
