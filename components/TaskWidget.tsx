import React from 'react';

export interface Task {
  id: string;
  title: string;
  status: string;
  // You can extend this interface with additional fields as needed
}

interface TaskWidgetProps {
  tasks: Task[];
  onTaskUpdate?: (taskId: string, newData: Partial<Task>) => void;
}

const TaskWidget: React.FC<TaskWidgetProps> = ({ tasks, onTaskUpdate }) => {
  return (
    <div style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
      <h2>Your Tasks</h2>
      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id} style={{ marginBottom: '0.5rem' }}>
              <strong>{task.title}</strong> - {task.status}
              {onTaskUpdate && (
                <button
                  style={{ marginLeft: '1rem' }}
                  onClick={() => onTaskUpdate(task.id, { status: 'updated' })}
                >
                  Update
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskWidget; 