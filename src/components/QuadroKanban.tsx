import React, { useState } from 'react';
import { initialTasks, nextStatusMap, prevStatusMap, Task, TaskStatus } from '../types/task';
import { Coluna } from './Coluna';
import { AddTaskForm } from './AddTaskForm';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import './QuadroKanban.css';

const statusMap: Record<string, TaskStatus> = {
    'coluna-todo': 'todo',
    'coluna-in-progress': 'in-progress',
    'coluna-done': 'done',
};

const reorder = <T,>(list: T[], startIndex: number, endIndex: number): T[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

export const QuadroKanban: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>(initialTasks);
    const [nextId, setNextId] = useState(initialTasks.length + 1);
    const [colunaMobileAtual, setColunaMobileAtual] = useState<number>(0);

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

    const onDragEnd = (result: DropResult) => {
        const { destination, source, draggableId } = result;

        if (!destination) return;
        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        const taskId = Number(draggableId.replace('task-', ''));
        const sourceDroppableId = source.droppableId;
        const destDroppableId = destination.droppableId;
        const taskToMove = tasks.find(t => t.id === taskId);

        if (!taskToMove) return;

        if (sourceDroppableId === destDroppableId) {

            const columnTasks = tasks.filter(task => task.status === statusMap[sourceDroppableId]);
            const reorderedColumn = reorder(columnTasks, source.index, destination.index);

            setTasks(prevTasks => {
                const otherTasks = prevTasks.filter(task => task.status !== statusMap[sourceDroppableId]);
                return [...otherTasks, ...reorderedColumn];
            });

        } else {
            const newStatus = statusMap[destDroppableId];

            setTasks(prevTasks => {
                const newTasks: Task[] = Array.from(prevTasks);

                const taskIndex = newTasks.findIndex(t => t.id === taskId);
                if (taskIndex === -1) return prevTasks;

                const [movedTask] = newTasks.splice(taskIndex, 1);

                movedTask.status = newStatus;

                const tasksInDestColumn = newTasks.filter(t => t.status === newStatus);

                tasksInDestColumn.splice(destination.index, 0, movedTask);

                const tasksWithoutDest = newTasks.filter(t => t.status !== newStatus);

                return [...tasksWithoutDest, ...tasksInDestColumn];
            });
        }
    };

    const avancarColuna = () => {
        setColunaMobileAtual(prev => (prev + 1) % 3);
    };

    const retrocederColuna = () => {
        setColunaMobileAtual(prev => (prev - 1 + 3) % 3);
    };

    const commonColumnProps = { tasks, moveTask, deleteTask };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="kanban-board-container">

                <div className="kanban-desktop">
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
                        <Coluna status="todo" {...commonColumnProps} title="A fazer" columnId="coluna-todo" />
                        <Coluna status="in-progress" {...commonColumnProps} title="Em andamento" columnId="coluna-in-progress" />
                        <Coluna status="done" {...commonColumnProps} title="Feito" columnId="coluna-done" />
                    </div>
                </div>

                <div className="kanban-mobile">
                    <div className="mobile-header">
                        <div className="titulo-coluna-mobile">
                            {colunaMobileAtual === 0 ? 'A fazer' :
                                colunaMobileAtual === 1 ? 'Em andamento' : 'Feito'}
                        </div>
                        <div className="botao-adicionar-mobile">
                            <AddTaskForm onAddTask={handleAddTask} />
                        </div>
                    </div>

                    <div className="mobile-carousel">
                        <button className="seta seta-esquerda" onClick={retrocederColuna}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 0 24 24" width="28px" fill="#3867D6">
                                <path d="M0 0h24v24H0V0z" fill="none" />
                                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59z" />
                            </svg>
                        </button>

                        <div className="mobile-coluna-container">
                            {colunaMobileAtual === 0 && (
                                <div className="kanban-column mobile">
                                    {tasks.filter(task => task.status === 'todo').map((task) => (
                                        <div key={task.id} className="task-card mobile">
                                            <div className="task-header-row">
                                                <div className="task-title">{task.title}</div>
                                                <span className="menu-icon">⋯</span>
                                            </div>
                                            <button className="description-toggle">Ler descrição</button>
                                            <div className="card-actions">
                                                <button className="action-icon next-icon" onClick={() => moveTask(task.id, 'next')}>
                                                    {'>'}
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {colunaMobileAtual === 1 && (
                                <Coluna
                                    status="in-progress"
                                    {...commonColumnProps}
                                    title="Em andamento"
                                    columnId="coluna-in-progress"
                                    isMobile={true}
                                />
                            )}
                            {colunaMobileAtual === 2 && (
                                <Coluna
                                    status="done"
                                    {...commonColumnProps}
                                    title="Feito"
                                    columnId="coluna-done"
                                    isMobile={true}
                                />
                            )}
                        </div>

                        <button className="seta seta-direita" onClick={avancarColuna}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 0 24 24" width="28px" fill="#3867D6">
                                <path d="M0 0h24v24H0V0z" fill="none" />
                                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z" />
                            </svg>
                        </button>
                    </div>

                    <div className="indicadores-coluna">
                        <div
                            className={`indicador ${colunaMobileAtual === 0 ? 'ativo' : ''}`}
                            onClick={() => setColunaMobileAtual(0)}
                        />
                        <div
                            className={`indicador ${colunaMobileAtual === 1 ? 'ativo' : ''}`}
                            onClick={() => setColunaMobileAtual(1)}
                        />
                        <div
                            className={`indicador ${colunaMobileAtual === 2 ? 'ativo' : ''}`}
                            onClick={() => setColunaMobileAtual(2)}
                        />
                    </div>
                </div>

            </div>
        </DragDropContext>
    );
};