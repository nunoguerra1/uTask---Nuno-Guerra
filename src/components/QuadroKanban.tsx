import React, { useState } from 'react';
import { initialTasks, nextStatusMap, prevStatusMap, Task } from '../types/task';
import { Coluna } from './Coluna';
import { AddTaskForm } from './AddTaskForm';


import './QuadroKanban.css';

export const QuadroKanban: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>(initialTasks);
    const [nextId, setNextId] = useState(initialTasks.length + 1);

    const handleAddTask = (title: string, description: string) => {
        const newTaskId = nextId;
        const newTask: Task = { id: newTaskId, title, description, status: 'todo' };
        setTasks(prevTasks => [...prevTasks, newTask]);
        setNextId(newTaskId + 1);
    };

    const moveTask = (taskId: number, direction: 'next' | 'prev') => {
        setTasks(prevTasks =>
            prevTasks.map(task => {
                if (task.id === taskId) {
                    const newStatus = direction === 'next'
                        ? nextStatusMap[task.status]
                        : prevStatusMap[task.status];

                    if (newStatus) {
                        return { ...task, status: newStatus };
                    }
                }
                return task;
            })
        );
    };

    const deleteTask = (taskId: number) => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    };

    const commonColumnProps = { tasks, moveTask, deleteTask };

    return (
        <div className="kanban-board-container">
            <div className="kanban-header-row">
                <div className="column-title-container" style={{ textAlign: 'left' }}>
                    A fazer
                </div>

                <div className="add-task-center">
                    <AddTaskForm onAddTask={handleAddTask} />
                </div>

                <div className="column-title-container">
                    Em andamento
                </div>

                <div className="column-title-container" style={{ textAlign: 'left' }}>
                    Feito
                </div>
            </div>

            <div className="kanban-columns-body">
                <Coluna status="todo" {...commonColumnProps} title="A fazer" />
                <Coluna status="in-progress" {...commonColumnProps} title="Em andamento" />
                <Coluna status="done" {...commonColumnProps} title="Feito" />
            </div>
        </div>
    );
};