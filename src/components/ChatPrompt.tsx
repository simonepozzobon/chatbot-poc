'use client';
import { useState } from 'react';
import { Panel } from './Panel';
import axios from 'axios';

const ENDPOINT = 'api/chat';

export const ChatPrompt = () => {
  const [inputMessage, setInputMessage] = useState('');

  const handleSubmit = async () => {
    if (!inputMessage) {
      console.log('No message to send');
      return;
    }

    const formattedMessage = {
      role: 'User',
      content: inputMessage,
    };

    const response = await axios.post(ENDPOINT, {
      conversationId: 123,
      messages: [formattedMessage],
    });
  };

  return (
    <Panel className="flex p-1">
      <input
        className="grow rounded-s bg-white p-2 shadow-inner  outline-primary focus:outline-2"
        onChange={(e) => setInputMessage(e.target.value)}
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
