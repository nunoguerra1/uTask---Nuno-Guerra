import React, { useState } from 'react';

interface AddTaskFormProps {
    onAddTask: (title: string, description: string) => void;
}

export const AddTaskForm: React.FC<AddTaskFormProps> = ({ onAddTask }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isFormVisible, setIsFormVisible] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim()) {
            onAddTask(title.trim(), description.trim());
            setTitle('');
            setDescription('');
            setIsFormVisible(false);
        }
    };

    const closeForm = () => {
        setIsFormVisible(false);
    };

    return (
        <div className="add-task-container">
            <button className="add-task-button" onClick={() => setIsFormVisible(true)} title="Adicionar nova tarefa">
                <svg xmlns="http://www.w3.org/2000/svg" height="38px" viewBox="0 0 24 24" width="38px" fill="#226ED8"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" /></svg>
            </button>

            {isFormVisible && (
                <div className="add-task-form-overlay" onClick={closeForm}>
                    <form className="add-task-form" onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>

                        <div className="modal-header">
                            <h2 className="modal-title">Nova Task</h2>
                            <button type="button" className="close-button" onClick={closeForm}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="38px" viewBox="0 0 24 24" width="38px" fill="#3867D6"><path d="M0 0h24v24H0V0z" fill="none" opacity=".87" /><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.59-13L12 10.59 8.41 7 7 8.41 10.59 12 7 15.59 8.41 17 12 13.41 15.59 17 17 15.59 13.41 12 17 8.41z" /></svg>
                            </button>
                        </div>

                        <div className='modal-divider'></div>

                        <label className="input-label" htmlFor="task-title">Título *</label>
                        <input id="task-title" type="text" placeholder="Enviar depoimento para o site da Unect" value={title} onChange={(e) => setTitle(e.target.value)} required />

                        <label className="input-label" htmlFor="task-description">Descrição</label>
                        <textarea id="task-description" placeholder="Eu achava que precisava entrar na Unect..." value={description} onChange={(e) => setDescription(e.target.value)} rows={4} />

                        <div className="form-actions-footer">
                            <button type="submit" disabled={!title.trim()} className="create-task-button">
                                Criar task
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};