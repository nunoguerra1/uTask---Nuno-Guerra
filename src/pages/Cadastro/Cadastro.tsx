import './Cadastro.css'
import BannerSuperior from '../../components/BannerSuperior'
import BoxCadastro from '../../components/BoxCadastro'
import Divisor from "../../components/Divisor";
import ImagemCadastro from '../../components/ImagemCadastro'
import Tema from '../../components/Tema'

function Cadastro() {
    return (
        <div>
            <BannerSuperior />
            <BoxCadastro />
            <Divisor />
            <ImagemCadastro />
            <div className='tema-cadastro'>
                <Tema />
            </div>
        </div>
    )
}

export default Cadastro