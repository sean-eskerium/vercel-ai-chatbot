import { NextResponse } from 'next/server';
import { callN8nAgent } from '@/lib/n8nIntegration';

export async function GET() {
  try {
    const testPayload = {
      message: "Test message from API endpoint"
    };

    console.log('Testing n8n webhook connection...');
    const response = await callN8nAgent(testPayload);
    
    return NextResponse.json({ 
      success: true, 
      message: 'N8n webhook test completed',
      response 
    });
  } catch (error: any) {
    console.error('Test endpoint error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
} 