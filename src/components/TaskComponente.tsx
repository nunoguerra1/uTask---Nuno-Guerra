import React, { useState } from 'react';
import { Task } from '../types/task';
import { Draggable, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';

interface TaskComponenteProps {
    task: Task;
    moveTask: (taskId: number, direction: 'next' | 'prev') => void;
    deleteTask: (taskId: number) => void;
    index: number;
}

export const TaskComponente: React.FC<TaskComponenteProps> = ({ task, moveTask, deleteTask, index }) => {
    const [showDescription, setShowDescription] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const status = task.status;
    const showNextButton = status !== 'done';
    const showPrevButton = status === 'in-progress' || status === 'done';

    const handleDelete = (taskId: number) => {
        deleteTask(taskId);
        setIsMenuOpen(false);
    };

    const expandIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill='currentColor'><path d="M24 24H0V0h24v24z" fill="none" opacity=".87" /><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z" /></svg>
    );

    const hideIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill='currentColor'><path d="M0 0h24v24H0V0z" fill="none" /><path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14l-6-6z" /></svg>
    )

    return (
        <Draggable draggableId={`task-${task.id}`} index={index}>
            {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                <div
                    className="task-card"
                    onMouseLeave={() => setIsMenuOpen(false)}

                    ref={provided.innerRef}

                    {...provided.draggableProps}

                    {...provided.dragHandleProps}

                    style={{
                        ...provided.draggableProps.style,
                        backgroundColor: snapshot.isDragging ? 'var(--cardTask-color)' : 'var(--cardTask-color)',
                        opacity: snapshot.isDragging ? 0.9 : 1,
                        userSelect: 'none',
                    }}
                >
                    <div className="task-header-row">

                        <div className="task-title">
                            {task.title}
                        </div>

                        <span className="menu-icon" onClick={(e) => { e.stopPropagation(); setIsMenuOpen(!isMenuOpen); }}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" /></svg>
                        </span>

                        {isMenuOpen && status === 'todo' && (
                            <button className="floating-delete-button" onClick={(e) => { e.stopPropagation(); handleDelete(task.id) }}>
                                Excluir
                            </button>
                        )}
                    </div>

                    <div className="description-action-row">
                        <button className="description-toggle" onClick={() => setShowDescription(!showDescription)}>
                            {showDescription ? 'Esconder descrição' : 'Ler descrição'}
                            {showDescription ? expandIcon : hideIcon}
                        </button>
                    </div>

                    {showDescription && (
                        <p className="task-description">
                            {task.description || 'Sem descrição.'}
                        </p>
                    )}

                    <div className="card-actions">
                        {showPrevButton && (
                            <button
                                className={`action-icon prev-icon ${status === 'done' ? 'undo-icon' : ''}`}
                                onClick={(e) => { e.stopPropagation(); moveTask(task.id, 'prev') }}
                                title={status === 'done' ? 'Mover para Em Andamento' : 'Voltar para A Fazer'}
                            >
                                {status === 'done' ? '⟲' : '<'}
                            </button>
                        )}

                        {showNextButton && (
                            <button
                                className="action-icon next-icon"
                                onClick={(e) => { e.stopPropagation(); moveTask(task.id, 'next') }}
                                title={status === 'todo' ? 'Avançar para Em Andamento' : 'Concluir'}
                            >
                                {'>'}
                            </button>
                        )}
                    </div>
                </div>
            )}
        </Draggable>
    );
};