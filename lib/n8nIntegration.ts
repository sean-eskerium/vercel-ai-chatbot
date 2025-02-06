interface N8nWebhookResponse {
  agentMessage: string;
  content: string;
  metadata: {
    status: string;
    count: number;
    tags: string[];
    content_format: string;
  }
}

export async function callN8nAgent(payload: object): Promise<N8nWebhookResponse> {
  const webhookUrl = process.env.N8N_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error('N8N_WEBHOOK_URL environment variable is not defined');
    throw new Error("N8N_WEBHOOK_URL is not defined");
  }

  console.log('Starting n8n webhook call to URL:', webhookUrl);
  console.log('Payload:', JSON.stringify(payload, null, 2));
  
  try {
    console.log('Making fetch request to n8n webhook...');
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.N8N_API_KEY || "",
      },
      body: JSON.stringify(payload),
    });

    console.log('Received response from n8n webhook:', {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries())
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('n8n webhook error:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
        url: webhookUrl
      });
      throw new Error(`n8n webhook failed: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data: N8nWebhookResponse = await response.json();
    console.log('n8n webhook response data:', JSON.stringify(data, null, 2));
    
    // Validate the response structure
    if (!data.content || typeof data.content !== 'string' || !data.metadata) {
      throw new Error('Invalid response structure from n8n webhook');
    }
    
    return data;
  } catch (error: any) {
    console.error('Error calling n8n webhook:', {
      error: error.message,
      stack: error.stack,
      url: webhookUrl
    });
    throw error;
  }
} 