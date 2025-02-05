import React from 'react';
import TaskWidget, { Task } from './TaskWidget';

interface ChatResponseRendererProps {
  responseData: any;
}

const ChatResponseRenderer: React.FC<ChatResponseRendererProps> = ({ responseData }) => {
  // If responseData contains widget information for task view
  if (responseData && responseData.widgetType === 'taskView' && Array.isArray(responseData.tasks)) {
    return <TaskWidget tasks={responseData.tasks} />;
  }

  // Otherwise, render plain text or JSON string
  return (
    <div style={{ padding: '1rem', border: '1px solid #eee', margin: '1rem 0' }}>
      {typeof responseData === 'string' ? responseData : JSON.stringify(responseData, null, 2)}
    </div>
  );
};

export default ChatResponseRenderer; 