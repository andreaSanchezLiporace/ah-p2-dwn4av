import Navbar from "./Navbar";
import '../css/Header'

function Header() {
    return ( 
        <header className="header">
            <div className="visually-hidden"> <h1>Esparta</h1> </div>
            <div className="header__header">
                <div className="image_logo">
                    <img src="/logoblanco.png" alt="Logotipo de Esparta" />
                </div>
                <Navbar />
            </div>
        </header>
    )
}

export default Header