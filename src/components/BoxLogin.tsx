import './BoxLogin.css'
import DivisorLogin from '../assets/imagens/DivisorTelaLogin.png'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import AlertLogin from './AlertLogin';

interface ValidationErrors {
    email?: string;
    senha?: string;
}

interface User {
    id: number;
    email: string;
    senha: string;
    usuario: string;
}

function BoxLogin() {
    const [formData, setFormData] = useState({
        email: '',
        senha: ''
    })

    const [errors, setErrors] = useState<ValidationErrors>({})
    const [showModal, setShowModal] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validationErrors: ValidationErrors = {}
        let isValid = true;

        if (!formData.email) {
            validationErrors.email = "Email é obrigatório";
            isValid = false;
        }

        if (!formData.senha) {
            validationErrors.senha = "Senha é obrigatória";
            isValid = false;
        }

        setErrors(validationErrors);

        if (isValid) {
            axios.get<User[]>('http://localhost:3000/users')
                .then((result) => {
                    let userFound = false;
                    let passwordCorrect = false;

                    result.data.forEach((user: User) => {
                        if (user.email === formData.email) {
                            userFound = true;
                            if (user.senha === formData.senha) {
                                passwordCorrect = true;
                                setShowModal(true)
                                setTimeout(() => {
                                    setShowModal(false)
                                    localStorage.setItem('usuarioLogado', JSON.stringify(user));
                                    navigate('/dashboard');
                                }, 3000)
                            }
                        }
                    });

                    if (!userFound) {
                        setErrors({ email: "Email não encontrado" });
                    } else if (!passwordCorrect) {
                        setErrors({ senha: "Senha incorreta" });
                    }
                })
                .catch(err => {
                    console.log(err);
                    setErrors({ email: "Erro ao conectar com o servidor" });
                });
        }
    }

    return (

        <>

            <form className='TelaLogin' onSubmit={handleSubmit}>

                <h1>uTask 3.0</h1>

                <div className='forms'>
                    <label htmlFor="email">E-mail</label>
                    <input type="email" id="email" placeholder='Endereço de e-mail' value={formData.email} className={errors.email ? 'input-error' : ''} onChange={(event) => setFormData({ ...formData, email: event.target.value })} />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                <div className='forms'>
                    <label htmlFor="senha">Senha</label>
                    <input type="password" id="senha" placeholder='Senha secreta' value={formData.senha} className={errors.senha ? 'input-error' : ''} onChange={(event) => setFormData({ ...formData, senha: event.target.value })} />
                    {errors.senha && <span className="error-message">{errors.senha}</span>}
                    <a href="#" className='esqueciSenha'>Esqueceu a senha ?</a>
                </div>

                <button type='submit' className='btnEntrar'>
                    Entrar
                </button>

                <img className='DivisorLogin' src={DivisorLogin} alt="divisor" />

                <a href="/Cadastro" className='CriarConta'>Não tem cadastro ? Crie uma conta</a>
            </form>

            <AlertLogin isOpen={showModal} />

        </>

    )
}

export default BoxLogin