'use client';
import { MESSAGE_ROLE } from '@/constants/messages';
import { Message } from '@prisma/client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export const MESSAGES_QUERY_KEY = 'messages';

type MessagesState = {
  messages: Message[];
};

export const useMessages = ({ conversationId, initialData }: { conversationId: string; initialData: Message[] }) => {
  return useQuery<MessagesState>({
    queryKey: [MESSAGES_QUERY_KEY, conversationId],
    queryFn: async () => {
      const response = await axios.get(`/api/chat?conversationId=${conversationId}`);
      return {
        messages: response.data?.Message ?? [],
      };
    },
    initialData: {
      messages: initialData,
    },
  });
};

export const usePostMessageMutation = ({ conversationId }: { conversationId: string }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [MESSAGES_QUERY_KEY, conversationId],
    mutationFn: async ({ message }: { message: string }) => {
      const response = await axios.post('/api/chat', { message, conversationId });
      return response.data;
    },
    onMutate: ({ message }) => {
      queryClient.setQueryData<MessagesState>([MESSAGES_QUERY_KEY, conversationId], (state) => {
        return {
          messages: [
            ...(state?.messages ? state.messages : []),
            {
              id: Math.random().toString(),
              content: message,
              role: MESSAGE_ROLE.USER,
              conversationId,
            },
          ],
        };
      });
    },
    onSuccess: (data) => {
      queryClient.setQueryData<MessagesState>([MESSAGES_QUERY_KEY, conversationId], (state) => {
        return {
          messages: [
            ...(state?.messages ? state.messages : []),
            {
              id: Math.random().toString(),
              content: data,
              role: MESSAGE_ROLE.AI,
              conversationId,
            },
          ],
        };
      });
    },
  });
};
