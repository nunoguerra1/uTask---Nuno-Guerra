import { useState } from 'react'
import './Tema.css'

function Tema() {
    const [isDark, setIsDark] = useState(false);

    const alternarTema = () => {
        setIsDark(!isDark);
        document.documentElement.setAttribute('data-theme', !isDark ? 'dark' : 'light');
    };

    return (
        <div className="toggle-container" onClick={alternarTema}>
            <div className={`toggle-btn ${isDark ? 'dark' : 'light'}`}>
                <i className='bx bxs-sun'></i>
                <i className='bx bxs-moon'></i>
                <div className="slider"></div>
            </div>
        </div>
    )
}

export default Tema