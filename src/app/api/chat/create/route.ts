import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  // authenticate the user here

  const conversation = await prisma.conversation.create({
    data: {
      name: 'New conversation',
    },
  });

  return NextResponse.json(conversation);
}
