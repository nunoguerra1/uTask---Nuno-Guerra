import './BoxCadastro.css'
import DivisorCadastro from '../assets/imagens/DivisorTelaLogin.png'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import AlertCadastro from './AlertCadastro';

interface ValidationErrors {
    usuario?: string;
    email?: string;
    senha?: string;
    csenha?: string;
}

function BoxCadastro() {
    const [formData, setFormData] = useState({
        usuario: '',
        email: '',
        senha: '',
        csenha: ''
    })

    const [errors, setErrors] = useState<ValidationErrors>({})
    const [showModal, setShowModal] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validationErrors: ValidationErrors = {}

        if (formData.csenha !== formData.senha) {
            validationErrors.csenha = "Senhas não combinam, tente novamente."
        }

        setErrors(validationErrors)

        if (Object.keys(validationErrors).length === 0) {
            axios.post('http://localhost:3000/users', formData)
                .then(() => {
                    setShowModal(true)
                    setTimeout(() => {
                        setShowModal(false)
                        navigate('/')
                    }, 3000)
                })
                .catch(err => console.log(err))
        }
    }

    return (

        <>

            <form className='TelaCadastro' onSubmit={handleSubmit}>

                <h1>uTask 3.0</h1>

                <img src={DivisorCadastro} alt="divisorCadastro" />

                <p>Crie uma conta</p>

                <div className='formscad'>
                    <label htmlFor="usuario">Nome de usuário</label>
                    <input type="text" id='usuario' placeholder='Seu nome de usuário' onChange={(event) => setFormData({ ...formData, usuario: event.target.value })} />
                </div>

                <div className='formscad'>
                    <label htmlFor="email">E-mail</label>
                    <input type="email" id="email" placeholder='Endereço de e-mail' onChange={(event) => setFormData({ ...formData, email: event.target.value })} />
                </div>

                <div className='formscad'>
                    <label htmlFor="senha">Senha</label>
                    <input type="password" id='senha' placeholder='Senha secreta' className={errors.csenha ? 'input-error' : ''} onChange={(event) => setFormData({ ...formData, senha: event.target.value })} />
                </div>

                <div className='formscad'>
                    <label htmlFor="confirmaSenha">Confirme a senha</label>
                    <input type="password" id='confirmaSenha' placeholder='Senha secreta' className={errors.csenha ? 'input-error' : ''} onChange={(event) => setFormData({ ...formData, csenha: event.target.value })} />
                    {errors.csenha && <span className="error-message">{errors.csenha}</span>}
                </div>

                <button type='submit' className='btnCadastrar'>
                    Criar Cadastro
                </button>
            </form>

            <AlertCadastro isOpen={showModal} />

        </>

    )
}

export default BoxCadastro