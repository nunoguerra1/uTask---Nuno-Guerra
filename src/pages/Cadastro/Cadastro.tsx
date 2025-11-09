import './Cadastro.css'
import BannerSuperior from '../../components/BannerSuperior'
import BoxCadastro from '../../components/BoxCadastro'
import Divisor from "../../components/Divisor";
import ImagemCadastro from '../../components/ImagemCadastro'

function Cadastro() {
    return (
        <div>
            <BannerSuperior />
            <BoxCadastro />
            <div className='ImagemDivisao'>
                <Divisor />
            </div>
            <ImagemCadastro />
        </div>
    )
}

export default Cadastro