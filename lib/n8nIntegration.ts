export async function callN8nAgent(payload: object): Promise<any> {
  const webhookUrl = process.env.N8N_WEBHOOK_URL;
  if (!webhookUrl) {
    throw new Error("N8N_WEBHOOK_URL is not defined");
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.N8N_API_KEY || "",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("n8n webhook call failed");
  }

  return response.json();
} 