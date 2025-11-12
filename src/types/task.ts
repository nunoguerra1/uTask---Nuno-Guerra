export type TaskStatus = 'todo' | 'in-progress' | 'done';

export interface Task {
    id: number;
    title: string;
    description: string;
    status: TaskStatus;
}

export const nextStatusMap: Record<TaskStatus, TaskStatus | null> = {
    'todo': 'in-progress',
    'in-progress': 'done',
    'done': null,
};

export const prevStatusMap: Record<TaskStatus, TaskStatus | null> = {
    'todo': null,
    'in-progress': 'todo',
    'done': 'in-progress',
};

export const initialTasks: Task[] = [
    { id: 1, title: 'Pagar conta de luz', description: 'Vencimento dia 15.', status: 'todo' },
    { id: 2, title: 'Fazer compras no mercado', description: 'Comprar batata, cenoura, feijão, alho, arroz e pipoca.', status: 'todo' },
    { id: 3, title: 'Fazer manicure', description: 'Ligar para agendar.', status: 'todo' },
    { id: 4, title: 'Fazer manicure', description: 'Sessão agendada para quarta-feira.', status: 'in-progress' },
    { id: 5, title: 'Pintar o cabelo', description: 'Comprar tinta e agendar horário.', status: 'done' },
];