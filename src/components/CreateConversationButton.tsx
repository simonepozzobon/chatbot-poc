'use client';

import { Conversation } from '@prisma/client';
import axios from 'axios';
import { redirect } from 'next/navigation';

export const CreateConversationButton = () => {
  const handleCreate = async () => {
    try {
      const response = await axios.post<Conversation>('/api/chat/create');

      if (!response || !response.data) {
        throw new Error('Error creating conversation');
      }

      const conversation = response.data;
      return redirect(`/chat/${conversation.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button className="mt-auto rounded bg-white px-2 py-1 hover:bg-white/70" onClick={() => handleCreate()}>
      Create new conversation
    </button>
  );
};
