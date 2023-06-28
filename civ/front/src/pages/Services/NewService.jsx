import { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import * as VehiclesServices from '../../Services/vehicles'
import * as ServicesServices from '../../Services/services'

import './../../css/Services/newService.css'

function NewService() {
    let navigate = useNavigate()
    const date = new Date().getDate()+'/'+(new Date().getMonth()+1)+'/'+new Date().getFullYear()
    const [mechanic, setMechanic] = useState('')

    const [vehicles, setVehicles] = useState([])

    const [domain, setDomain] = useState('')
    const [dni, setDni] = useState(0)
    const [order, setOrder] = useState('')
    const [detail, setDetail] = useState('')
    const [total, setTotal] = useState(0)
    const [km, setKm] = useState('')
    const [spareParts, setSpareParts] = useState('')

    const [error, setError] = useState('')

    useEffect(() => {
        const user = localStorage.getItem('user')

        if(!user) {
            navigate('/', {replace: true})
            return
        }

        setMechanic(user.replace(/[ '"]+/g, ''))

        VehiclesServices.findAll()
            .then(vehicles => setVehicles(vehicles))
            .catch(err => console.error(err))
        
        ServicesServices.numberOfServices()
            .then(quantity => quantity ? setOrder(Number(quantity) + 1) : setOrder(1))
            .catch(err => console.error(err))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        if(dni !== '' && domain !== '' && detail !== '' && total !== 0) {
            const newService = {
                state: 'Pendiente',
                payment: 'Pendiente',
                date,
                order,
                mechanic,
                dni,
                domain,
                km,
                spareParts,
                detail,
                total,
            }
            ServicesServices.newService(newService)
        } else {
            setError('Debe completar todos los campos requeridos')
            window.scroll(0,0)
        }
    }

    return (
        <div className="newService">
            <div className="header">
                <p>Ingresá un nuevo servicio</p>
            </div>
            {error && <div className="alert alert-danger text-center" role="alert">{error}</div>}
            <div className="content">
                <span className="text-muted">* Campos requeridos</span>
                <form action="#" onSubmit={handleSubmit}>
                    <div className="first-form">
                        <div className="form">
                            <div className='margin-adjust'>
                                <div>
                                    <label htmlFor="date">Fecha</label>
                                    <input type="text" name='date' id='date' 
                                        readOnly
                                        value={date}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="mechanic">Mecánico</label>
                                    <input type="text" name="mechanic" id="mechanic"
                                        readOnly
                                        value={mechanic}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="order">N° de orden</label>
                                    <input 
                                        type="number" 
                                        name='order' 
                                        id='order'
                                        readOnly
                                        value={order}
                                    />  
                                </div>
                            </div>
                            <div className='margin-adjust'>
                                <div>
                                    <label htmlFor="dni">DNI del propietario</label>
                                    <input 
                                        type="number" 
                                        name='dni' 
                                        id='dni'
                                        min={0}
                                        placeholder="DNI del propietario *"
                                        required
                                        onChange={(e) => setDni(Number(e.target.value))}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="domain">Dominio</label>
                                    <select
                                        defaultValue={"0"}
                                        required
                                        onChange={(e) => setDomain(e.target.value)}
                                    >
                                        <option value="0" disabled>Seleccione el dominio del vehículo *</option>
                                        {vehicles.map(vehicle => {
                                            return(
                                                <option key={vehicle.domain} value={vehicle.domain}>{vehicle.domain}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="km">Kilometraje actual</label>
                                    <input type="number" name="km" id="km"
                                        placeholder='Kilometraje actual'
                                        min={0}
                                        onChange={(e) => setKm(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div>
                                <div>
                                    <label htmlFor="spareParts">Repuestos a utilizar</label>
                                    <textarea name="spareParts" id="spareParts" cols="30" rows="1"
                                        required
                                        placeholder='Repuestos a utilizar'
                                        onChange={(e) => setSpareParts(e.target.value)}
                                    ></textarea>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <label htmlFor="detail">Trabajo a realizar</label>
                                    <textarea name="detail" id="detail" cols="30" rows="2"
                                        required
                                        placeholder='Trabajo a realizar *'
                                        onChange={(e) => setDetail(e.target.value)}
                                    ></textarea>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <label htmlFor="total">Total $</label>
                                    <input 
                                        type="number" 
                                        name='total' 
                                        id='total'
                                        placeholder='Total a abonar *'
                                        required
                                        min={0}
                                        onChange={(e) => setTotal(Number(e.target.value))}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="buttons">
                        <button type="submit" className="btn__submit-form">Guardar</button>
                        <Link 
                            to={'/services'}
                            className="btn__back">Volver</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NewService