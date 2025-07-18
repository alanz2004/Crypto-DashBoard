// components/TeamTasks.tsx
import React from 'react';

type Task = {
  id: number;
  title: string;
  assignedTo: string;
  status: 'To Do' | 'In Progress' | 'Done';
  eta?: string;
};

const tasks: Task[] = [
  {
    id: 1,
    title: 'Deploy token contract to mainnet',
    assignedTo: 'Sarah',
    status: 'In Progress',
    eta: 'July 22',
  },
  {
    id: 2,
    title: 'Design staking dashboard',
    assignedTo: 'Alan',
    status: 'To Do',
  },
  {
    id: 3,
    title: 'Run security audit with Halborn',
    assignedTo: 'Jake',
    status: 'Done',
    eta: 'July 10',
  },
];

const TeamTasks: React.FC = () => {
  const handleAddTask = () => {
    alert('This will open a task creation form.');
  };

  return (
    <div className="team-tasks-container">
      <div className="task-header">
        <h2 className="team-tasks-title">Team Tasks</h2>
      </div>

      <div className="task-flex-container">
        {tasks.map((task) => (
          <div key={task.id} className="task-card">
            <h3 className="task-title">{task.title}</h3>
            <p className="task-detail"><strong>Assigned to:</strong> {task.assignedTo}</p>
            {task.eta && <p className="task-detail"><strong>ETA:</strong> {task.eta}</p>}
            <span className={`task-status ${task.status.toLowerCase().replace(' ', '-')}`}>
              {task.status}
            </span>
          </div>
        ))}
      </div>

       <button className="add-task-button" onClick={handleAddTask}>
          ＋ Add Task
        </button>
    </div>
  );
};

export default TeamTasks;
