import { callN8nAgent } from './n8nIntegration';

export const n8nTool = {
  name: 'n8nAutomationTool',
  description: 'Tool for handling automation tasks via n8n. It sends a webhook call to an n8n workflow, supplying the Session ID, User ID, and chat message.',
  execute: async (sessionId: string, userId: string, message: string): Promise<any> => {
    const payload = {
      sessionId,
      userId,
      message
    };
    return await callN8nAgent(payload);
  },
}; 