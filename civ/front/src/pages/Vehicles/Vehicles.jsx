import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import * as VehiclesService from '../../Services/vehicles'

import './../../css/Vehicles/vehicles.css'

function Vehicles() {
    let navigate = useNavigate()
    const [vehicles, setVehicles] = useState([])
    
    useEffect(() => {
        const userName = localStorage.getItem('userName')
        if (userName) {
            VehiclesService.findAll()
                .then(vehicles => setVehicles(vehicles))
            window.scroll(0,0)
        } else {
            navigate('/', {replace: true})
        }
    }, [navigate])

    const handleSubmitDelete = (e) => {
        e.preventDefault()
        VehiclesService.deleteOne(e.target.name) 
    }

    return (
        <div className="vehicles">
            <div className="header">
                <p>Listado de Vehículos</p>
            </div>
            <div className="content">
                <div className="table">
                    <div className="link">
                        <Link 
                            to={`/vehicles/new-vehicle`} 
                            className="btn__load-new"
                        >
                            Ingresar Nuevo Vehículo
                        </Link>
                    </div>
                    <div className="listing">
                        <div className="header">
                            <div>
                                <p>Vehículo</p>
                                <p>Dominio</p>
                                <p>Tipo</p>
                                <p>Color</p>
                                <p>Año</p>
                                <p>Seguro</p>
                                <p>Servicios</p>
                                <p>Acciones</p>
                            </div>
                        </div>
                        <div className="data">
                            {vehicles.map((vehicle, i) => 
                            // TO-DO: INCLUIR EN UN COMPONENTE.
                                <div
                                    className="vehicle"
                                    key={i}
                                >
                                    <div className="info">
                                        <p>{ `${vehicle.make} ${vehicle.model || ''}` }</p>
                                    </div>
                                    <div className="info">
                                        <p>{ vehicle.domain }</p>
                                    </div>
                                    <div className="info">
                                        <p>{ vehicle.type || '' }</p>
                                    </div>
                                    <div className="info">
                                        <p>{ vehicle.color || '' }</p>
                                    </div>
                                    <div className="info">
                                        <p>{ vehicle.year || '' }</p>
                                    </div>
                                    <div className="info">
                                        <p>{ vehicle.insurance || '' }</p>
                                    </div>
                                    <div className="info info-buttons">
                                        {/* <Link to="#" className="btn__see-more">Ver</Link> */}
                                        <span className="text-muted">* Próximamente</span>
                                    </div>
                                    <div className="info info-buttons">
                                        <Link 
                                            to={`/vehicles/${vehicle.domain}/edit`} 
                                            className="btn__edit"
                                        >
                                            Consultar
                                        </Link>
                                        <div className="btn__delete">
                                            <form 
                                                onSubmit={handleSubmitDelete} 
                                                name={vehicle.domain}
                                            >
                                                <button type="submit">Eliminar</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Vehicles