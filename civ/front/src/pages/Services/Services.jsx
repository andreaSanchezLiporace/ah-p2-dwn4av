import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import * as ServicesService from '../../Services/services'
import './../../css/Services/services.css'

function Services() {
    const [services, setServices] = useState([])

    useEffect(() => {
        ServicesService.findAll()
            .then(services => {
                setServices(services)
            })
            window.scroll(0,0)
    }, [])

    return (
        <div className="services">
            <div className="header">
                <p>Listado de Servicios</p>
            </div>
            <div className="content">
                <div className="table">
                    <div className="link">
                        <Link to={`/services/new-service`} className="btn__load-new">
                            Ingresar Nuevo Servicio
                        </Link>
                    </div>
                    <div className="listing">
                        <div className="header">
                            <div>
                                <p>Fecha</p>
                                <p>Vehículo</p>
                                <p>Cliente</p>
                                <p>Orden</p>
                                <p>Total</p>
                                <p>Pago</p>
                                <p>Estado</p>
                                <p>Acciones</p>
                            </div>
                        </div>
                        <div className="data">
                            {services.map((service, i) =>
                            // TO-DO: INCLUIR EN UN COMPONENTE
                                <div
                                    className="service"
                                    key={i}
                                >
                                    <div className="info">
                                        <p>{ service.date || '' }</p>
                                    </div>
                                    <div className="info">
                                        <p>{ service.domain }</p>
                                    </div>
                                    <div className="info">
                                        <p>{ service.dni || '' }</p>
                                    </div>
                                    <div className="info">
                                        <p>{ service.order || '' }</p>
                                    </div>
                                    <div className="info">
                                        <p>$ { service.total || '' }</p>
                                    </div>
                                    <div className="info">
                                        <p>{ service.payment || '' }</p>
                                    </div>
                                    <div className="info">
                                        <p>{ service.state || '' }</p>
                                    </div>
                                    <div className="info info-buttons">
                                        <Link 
                                            to={`/services/${service._id}/edit`} 
                                            className="btn__edit"
                                        >
                                            Consultar
                                        </Link>
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

export default Services