import { agentTools } from './agentTools';

export const systemPrompt = `
You are a helpful chatbot. When a user request involves automation tasks (such as retrieving or updating tasks), use the 'n8nAutomationTool' to delegate the request via a webhook.

Instructions for tool usage:
- When the user asks for tasks, include the Session ID, User ID, and the chat message in the payload.
- Interpret responses from the n8n tool: if it returns a simple text, display it; if it returns a structured payload with a widget (e.g., widgetType: "taskView"), render the corresponding UI component.
`;

export const agentConfiguration = {
  systemPrompt,
  tools: agentTools,
}; 