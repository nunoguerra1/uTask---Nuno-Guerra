import './BoxLogin.css'
import DivisorLogin from '../assets/imagens/DivisorTelaLogin.png'

function BoxLogin() {
    return (
        <div className='TelaLogin'>
            <h1>uTask 3.0</h1>

            <div className='forms'>
                <label htmlFor="email">E-mail</label>
                <input type="email" id="email" placeholder='Endereço de e-mail' />
            </div>

            <div className='forms'>
                <label htmlFor="senha">Senha</label>
                <input type="password" id="senha" placeholder='Senha secreta' />
                <a href="#" className='esqueciSenha'>Esqueceu a senha ?</a>
            </div>

            <button type='submit' className='btnEntrar'>
                Entrar
            </button>

            <img className='DivisorLogin' src={DivisorLogin} alt="divisor" />

            <a href="#" className='CriarConta'>Não tem cadastro ? Crie uma conta</a>
        </div>
    )
}

export default BoxLogin