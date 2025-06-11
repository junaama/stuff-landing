import { getIronSession } from 'iron-session';
import { SessionData, sessionOptions } from '@/lib/session'; // Adjust path if necessary
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { password } = await request.json();

  if (password === process.env.ADMIN_LOGIN_PASSWORD) {
    const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
    session.isAdmin = true;
    await session.save();
    return NextResponse.json({ message: 'Logged in' }, { status: 200 });
  }

  return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
}