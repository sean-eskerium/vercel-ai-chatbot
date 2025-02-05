# Migration to n8n Integration

This document explains how to migrate the chat agent's automation features from its current implementation to integrate with an n8n-based agent via a webhook. The goal is to offload certain automation tasks (such as ClickUp task retrieval and updates) to an n8n workflow while the chat agent continues to handle conversational context and UI rendering.

## Background & Overview

Currently, the chat agent processes user messages internally. To add advanced automation, we want to define an n8n agent as a tool within the chat agent. When a user requests tasks (for example, "get my ClickUp tasks"), the chat agent will call a webhook to the n8n agent with a payload that includes the Session ID, User ID, and the chat message in JSON format.

The n8n workflow will process the request and return a JSON response. The response can be:

- A simple text message that is displayed in the chat interface, or
- A structured JSON payload that triggers an interactive UI widget (e.g., a Task View) in the chat interface.

For testing, since localhost isn't publicly accessible, you can use a tunneling service (like ngrok) to expose your local instance. The public URL from the tunnel is then set in an environment variable (e.g., `N8N_WEBHOOK_URL`).

## Step-by-Step Guide

### Part 1: Setting Up the Webhook Integration as an Agent Tool

1. **Create an n8n Integration Helper**
   - **File:** `lib/n8nIntegration.ts`
   - **Purpose:** Provide a helper function to send webhook requests to the n8n agent.
   
   _Example Code:_
   ```typescript
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
   ```

2. **Integrate n8n as a Tool in the Chat Agent**
   - Update the agent's system prompt/configuration to include a new tool called "n8n automation tool". The description should instruct the agent to use this tool when handling requests like task retrieval or updates.
   - Make sure the payload includes the Session ID, User ID, and chat message.

3. **Testing the Webhook Integration**
   - Use a tunneling service (e.g., ngrok) to expose your local development server to the internet.
   - Set `N8N_WEBHOOK_URL` (and `N8N_API_KEY` if needed) in your environment configuration.
   - Test the integration by triggering a tool call and confirming that the n8n webhook receives the correct payload and processes the request.

### Part 2: Implementing the Generative UI Component for Task View

1. **Create a Task Widget Component**
   - **File:** `components/TaskWidget.tsx`
   - **Purpose:** Render an interactive UI widget that displays task information (retrieved from the n8n workflow) in the chat interface.
   - The widget should allow user interactions (e.g., updating task details) and trigger further webhook calls back to n8n for processing updates.

2. **Handle n8n Responses in the Chat Interface**
   - Update the chat rendering code to detect n8n responses. If a response contains a widget payload (e.g., a key `widgetType: "taskView"`), render the `TaskWidget` component with the provided data.
   - When a user interacts with the widget, have the component send a new webhook request to n8n (using the integration helper) with the action details.

3. **Ensure Configuration via Environment Variables**
   - Use environment variables (e.g., `N8N_WEBHOOK_URL`, `N8N_API_KEY`) in all webhook-related code, so that these can be updated without changing the code itself.

## Checklist for Migration

### Files to Create or Update

- **New Files:**
  1. `lib/n8nIntegration.ts` – Contains helper functions for webhook communication with n8n.
  2. `components/TaskWidget.tsx` – Renders the interactive task view UI.

- **Files to Update:**
  1. **Agent Configuration/System Prompt:** Update the prompt to include instructions for using the n8n automation tool.
  2. **Chat Agent Code:** Modify tool call sections to include n8n integration using the helper functions.
  3. **Environment Configuration:** Update `.env`/`.env.local` to include:
     - `N8N_WEBHOOK_URL` 
     - `N8N_API_KEY` (if applicable)

### Requirements on the n8n Side

1. **Webhook Endpoint Setup:**
   - Create a webhook node in your n8n instance using the URL specified by `N8N_WEBHOOK_URL`.
   - Secure the endpoint using `N8N_API_KEY` if needed.

2. **Workflow Design:**
   - Build workflows that:
     - Parse the incoming payload (Session ID, User ID, chat message).
     - Route requests to the appropriate automation tasks (e.g., ClickUp API integration).
     - Return a JSON response either as a simple text message or as a widget payload (e.g., `widgetType: "taskView"`).

3. **Response Handling:**
   - Ensure the workflow returns responses in a format that the chat agent can interpret and render (either text or a widget structure).

### Testing Locally

- Use a tunneling service (e.g., ngrok) to expose your local server, and update `N8N_WEBHOOK_URL` accordingly.
- Validate the complete flow:
  1. Chat agent sends tool call to n8n.
  2. n8n receives the request and processes it.
  3. n8n returns a response (text or widget payload).
  4. Chat agent displays the response appropriately.

## Conclusion

By following the steps above, you can migrate your chat agent to integrate with an n8n automation agent using a webhook. This solution leverages environment variables for configuration and adds minimal changes to the current codebase through new helper modules and UI components.

---------------------------------------------------------------------------------------------------------

**End of Document** 