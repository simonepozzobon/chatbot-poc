'use client';
import { useRef, useState } from 'react';
import { Panel } from './Panel';
import axios from 'axios';
import { usePostMessageMutation } from '@/hooks/useMessages';

const ENDPOINT = 'api/chat';

export type ChatPromptProps = {
  conversationId: string;
};

export const ChatPrompt = ({ conversationId }: ChatPromptProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const postMessage = usePostMessageMutation({ conversationId });
  const [inputMessage, setInputMessage] = useState('');

  const handleSubmit = async () => {
    if (!inputMessage) {
      console.log('No message to send');
      return;
    }

    postMessage.mutate({ message: inputMessage });
    setInputMessage('');
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <Panel className="flex p-1">
      <input
        ref={inputRef}
        className="grow rounded-s bg-white p-2 shadow-inner  outline-primary focus:outline-2"
        onChange={(e) => setInputMessage(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
      />
      <button
        className="rounded-e px-4 py-2 outline-primary hover:bg-primary/20 hover:outline-2"
        onClick={handleSubmit}
      >
        Send
      </button>
    </Panel>
  );
};
