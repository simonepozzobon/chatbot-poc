import { NextRequest, NextResponse } from 'next/server';
import { ChatOpenAI } from '@langchain/openai';
import { PromptTemplate } from '@langchain/core/prompts';
import { HttpResponseOutputParser } from 'langchain/output_parsers';
import { prisma } from '@/lib/prisma';
import { MESSAGE_ROLE } from '@/constants/messages';
import { Readable } from 'stream';

const formatMessage = (message: { role: string; content: string }) => {
  return `${message.role}: ${message.content}`;
};

const TEMPLATE = `You are an assistant named NeosperienceBot. All responses must be concise.

Current conversation:
{chat_history}

User: {input}
AI:`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.message) {
      throw new Error('Message is required');
    }

    if (!body.conversationId) {
      throw new Error('Conversation ID is required');
    }

    const conversation = await prisma.conversation.findFirst({
      where: { id: body.conversationId },
      include: { Message: true },
    });

    if (!conversation) {
      throw new Error('Conversation not found');
    }

    const messages = conversation.Message ?? [];
    const formattedPreviousMessages = messages.map(formatMessage);

    const currentMessageContent = body.message;

    // store the message in the database
    await prisma.message.create({
      data: {
        content: currentMessageContent,
        role: MESSAGE_ROLE.USER,
        conversationId: conversation.id,
      },
    });

    const prompt = PromptTemplate.fromTemplate(TEMPLATE);

    const model = new ChatOpenAI({
      temperature: 0.5,
      model: 'gpt-3.5-turbo',
    });

    const outputParser = new HttpResponseOutputParser();

    const chain = prompt.pipe(model).pipe(outputParser);

    const stream = await chain.stream({
      chat_history: formattedPreviousMessages.join('\n'),
      input: currentMessageContent,
    });

    const text = await new Response(stream).text();

    // store the AI response in the database
    await prisma.message.create({
      data: {
        content: text,
        role: MESSAGE_ROLE.AI,
        conversationId: conversation.id,
      },
    });

    return new Response(text, {
      status: 200,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: e.status ?? 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    console.log(req);

    const conversations = await prisma.conversation.findFirst({
      include: { Message: true },
    });

    return NextResponse.json(conversations);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: e.status ?? 500 });
  }
}
