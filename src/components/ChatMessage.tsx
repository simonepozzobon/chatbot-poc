import { MESSAGE_ROLE } from '@/constants/messages';

export type Message = {
  role: string;
  content: string;
};

export type ChatMessageProps = {
  message: Message;
};

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.role === MESSAGE_ROLE.USER;
  return (
    <div className={`flex gap-2 rounded p-2 ${isUser ? 'ml-auto bg-primary/20' : 'mr-auto bg-slate-200'}`}>
      {message.content}
    </div>
  );
};
