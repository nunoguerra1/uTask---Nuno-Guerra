import './Dashboard.css'
import BannerSuperior from '../../components/BannerSuperior'
import IconeUnect from '../../components/IconeUnect'
import BannerInferior from '../../components/BannerInferior'
import { QuadroKanban } from '../../components/QuadroKanban'
import FraseDia from '../../components/FraseDia'

function Dashboard() {
    return (
        <div className='dashboard'>
            <BannerSuperior />
            <IconeUnect />
            <h1>uTask 3.0</h1>
            <FraseDia />
            <QuadroKanban />
            <BannerInferior />
        </div>
    )
}

export default Dashboard