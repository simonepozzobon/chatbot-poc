import Link from 'next/link';

export type ConversationItemProps = {
  name: string | null;
  createdAt: Date;
  id: string;
};

export const ConversationItem = ({ name, createdAt, id }: ConversationItemProps) => {
  return (
    <div className="flex w-full items-center gap-4 rounded px-2 py-1 hover:bg-slate-200">
      <div>{name || createdAt.toISOString()}</div>
      <div className="ml-auto flex">
        <Link className="rounded bg-primary/20 p-2 text-xs" href={`/chat/${id}`}>
          Open
        </Link>
      </div>
    </div>
  );
};
