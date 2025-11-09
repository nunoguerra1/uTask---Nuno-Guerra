import BannerSuperior from "../../components/BannerSuperior";
import ImagemLogin from "../../components/ImagemLogin";
import Divisor from "../../components/Divisor";
import BoxLogin from "../../components/BoxLogin";
import './Login.css'

function Login() {
    return (
        <div>
            <BannerSuperior />
            <ImagemLogin />
            <div className="DivisorLogin">
                <Divisor />
            </div>
            <BoxLogin />
        </div>
    )
}

export default Login

