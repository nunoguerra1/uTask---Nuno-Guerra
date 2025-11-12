import React, { useState } from 'react';
import { Task } from '../types/task';

interface TaskComponenteProps {
    task: Task;
    moveTask: (taskId: number, direction: 'next' | 'prev') => void;
    deleteTask: (taskId: number) => void;
}

export const TaskComponente: React.FC<TaskComponenteProps> = ({ task, moveTask, deleteTask }) => {
    const [showDescription, setShowDescription] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const status = task.status;
    const showNextButton = status !== 'done';
    const showPrevButton = status === 'in-progress' || status === 'done';

    const handleDelete = (taskId: number) => {
        deleteTask(taskId);
        setIsMenuOpen(false);
    };

    return (
        <div className="task-card" onMouseLeave={() => setIsMenuOpen(false)}>
            <div className="task-header-row">
                <div className="task-title">{task.title}</div>

                <span
                    className="menu-icon"
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsMenuOpen(!isMenuOpen);
                    }}
                >
                    ⋮
                </span>

                {isMenuOpen && status === 'todo' && (
                    <button className="floating-delete-button" onClick={() => handleDelete(task.id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#DF0000" className="delete-svg-icon">
                            <path d="M0 0h24v24H0V0z" fill="none" />
                            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5z" />
                        </svg>
                        Excluir
                    </button>
                )}
            </div>

            <div className="description-action-row">
                <button
                    className="description-toggle"
                    onClick={() => setShowDescription(!showDescription)}
                >
                    {showDescription ? 'Esconder descrição' : 'Ler descrição'}
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
                        onClick={() => moveTask(task.id, 'prev')}
                        title={status === 'done' ? 'Mover para Em Andamento' : 'Voltar para A Fazer'}
                    >
                        {status === 'done' ? '⟲' : '<'}
                    </button>
                )}

                {showNextButton && (
                    <button
                        className="action-icon next-icon"
                        onClick={() => moveTask(task.id, 'next')}
                        title={status === 'todo' ? 'Avançar para Em Andamento' : 'Concluir'}
                    >
                        {'>'}
                    </button>
                )}
            </div>
        </div>
    );
};