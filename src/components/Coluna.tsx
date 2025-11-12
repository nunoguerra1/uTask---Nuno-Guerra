import React from 'react';
import { Task, TaskStatus } from '../types/task';
import { TaskComponente } from './TaskComponente';

interface ColunaProps {
    title: string;
    status: TaskStatus;
    tasks: Task[];
    moveTask: (taskId: number, direction: 'next' | 'prev') => void;
    deleteTask: (taskId: number) => void;
}

export const Coluna: React.FC<ColunaProps> = ({ status, tasks, moveTask, deleteTask }) => {
    const columnTasks = tasks.filter(task => task.status === status);

    return (
        <div className="kanban-column">

            <div className="task-list">
                {columnTasks.map(task => (
                    <TaskComponente
                        key={task.id}
                        task={task}
                        moveTask={moveTask}
                        deleteTask={deleteTask}
                    />
                ))}
            </div>
        </div>
    );
};