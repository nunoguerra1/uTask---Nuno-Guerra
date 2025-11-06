import './BoxCadastro.css'
import DivisorCadastro from '../assets/imagens/DivisorTelaLogin.png'

function BoxCadastro() {
    return (
        <div className='TelaCadastro'>
            <h1>uTask 3.0</h1>

            <img src={DivisorCadastro} alt="divisorCadastro" />

            <p>Crie uma conta</p>

            <div className='formscad'>
                <label htmlFor="usuario">Nome de usuário</label>
                <input type="text" id='usuario' placeholder='Seu nome de usuário' />
            </div>

            <div className='formscad'>
                <label htmlFor="email">E-mail</label>
                <input type="email" id="email" placeholder='Endereço de e-mail' />
            </div>

            <div className='formscad'>
                <label htmlFor="senha">Senha</label>
                <input type="password" id='senha' placeholder='Senha secreta' />
            </div>

            <div className='formscad'>
                <label htmlFor="confirmaSenha">Confirme a senha</label>
                <input type="password" id='confirmaSenha' placeholder='Senha secreta' />
            </div>

            <button type='submit' className='btnCadastrar'>
                Criar Cadastro
            </button>
        </div>
    )
}

export default BoxCadastro