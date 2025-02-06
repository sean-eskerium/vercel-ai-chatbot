import { tool } from 'ai';
import { z } from 'zod';
import { callN8nAgent } from '../../n8nIntegration';

interface N8nWriterAgentProps {
  session: any;
  chatId: string;
}

// Define the expected response format from the n8n webhook
interface N8nWebhookResponse {
  content: string;           // The main text content to be displayed in the chat
  type?: 'text' | 'task_list' | 'article_outline';  // Optional type to indicate special formatting
  metadata?: {              // Optional metadata for additional context
    status?: string;
    count?: number;
    tags?: string[];
    [key: string]: any;    // Allow for additional metadata fields
  };
}

export const createN8nWriterAgent = ({ session, chatId }: N8nWriterAgentProps) => {
  return tool({
    description: 'Tool for handling writing-related tasks via n8n webhook. Use this for article ideas, content creation, and task management.',
    parameters: z.object({
      message: z.string().describe('The message or request to be processed'),
      context: z.object({
        type: z.string().describe('The type of request (e.g., "article_ideas", "content_creation", "task_management")'),
        details: z.record(z.any()).optional().describe('Additional context or parameters for the request')
      }).optional().describe('Optional context about the request')
    }),
    execute: async ({ message, context }) => {
      if (!session?.user?.id) {
        return 'Error: Not authenticated';
      }

      try {
        const payload = {
          message,
          sessionId: chatId,
          userId: session.user.id,
          context: context || { type: 'general' }
        };

        console.log('Sending payload to n8n:', payload);
        const response = await callN8nAgent(payload);
        
        if (response.error) {
          console.error('n8nWriterAgent error:', response.message);
          return `I encountered an error while processing your request: ${response.message}`;
        }

        // Validate and format the response
        if (typeof response === 'string') {
          // Handle simple string responses
          return response;
        } else if (typeof response.content === 'string') {
          // Handle structured responses
          if (response.type === 'task_list' || response.type === 'article_outline') {
            // Format special types appropriately
            return response.content;
          }
          return response.content;
        } else {
          console.error('Invalid response format from n8n webhook:', response);
          return 'I received an invalid response format. Please try again.';
        }

      } catch (error: any) {
        console.error('Error in n8nWriterAgent:', error);
        return `I encountered an error while processing your request. Please try again later.`;
      }
    }
  });
};

export default createN8nWriterAgent; 