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

    const commonColumnProps = { tasks, moveTask, deleteTask };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
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
                    <Coluna status="todo" {...commonColumnProps} title="A fazer" columnId="coluna-todo" />
                    <Coluna status="in-progress" {...commonColumnProps} title="Em andamento" columnId="coluna-in-progress" />
                    <Coluna status="done" {...commonColumnProps} title="Feito" columnId="coluna-done" />
                </div>
            </div>
        </DragDropContext>
    );
};