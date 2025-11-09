import './Dashboard.css'
import BannerSuperior from '../../components/BannerSuperior'
import IconeUnect from '../../components/IconeUnect'

function Dashboard() {
    return (
        <div className='dashboard'>
            <BannerSuperior />
            <IconeUnect />
            <h1>uTask 3.0</h1>
        </div>
    )
}

export default Dashboard