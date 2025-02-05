import { NextResponse } from 'next/server';
import { n8nTool } from '@/lib/n8nTool';

export async function GET(request: Request) {
  try {
    // Sample test data
    const sessionId = 'test-session';
    const userId = 'test-user';
    const message = 'Test message for n8n automation';

    const result = await n8nTool.execute(sessionId, userId, message);

    return NextResponse.json({ result });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 });
  }
} 