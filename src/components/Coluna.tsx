import React from 'react';
import { Task, TaskStatus } from '../types/task';
import { TaskComponente } from './TaskComponente';
import { Droppable } from 'react-beautiful-dnd';

interface ColunaProps {
    title: string;
    status: TaskStatus;
    tasks: Task[];
    moveTask: (taskId: number, direction: 'next' | 'prev') => void;
    deleteTask: (taskId: number) => void;
    columnId: string;
    isMobile?: boolean;
}

export const Coluna: React.FC<ColunaProps> = ({
    status,
    tasks,
    moveTask,
    deleteTask,
    columnId,
    isMobile = false
}) => {
    const columnTasks = tasks.filter(task => task.status === status);

    return (
        <div className={`kanban-column ${isMobile ? 'mobile' : ''}`}>

            <Droppable droppableId={columnId}>
                {(provided, snapshot) => (
                    <div
                        className="task-list"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={{
                            backgroundColor: snapshot.isDraggingOver ? 'rgba(0, 0, 0, 0.05)' : 'transparent',
                            minHeight: '100px',
                            padding: '8px 0',
                        }}
                    >
                        {columnTasks.map((task, index) => (
                            <TaskComponente
                                key={task.id}
                                task={task}
                                moveTask={moveTask}
                                deleteTask={deleteTask}
                                index={index}
                                isMobile={isMobile}
                            />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
};