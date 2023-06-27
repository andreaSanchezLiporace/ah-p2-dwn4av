import { useState } from 'react'
import { Link } from 'react-router-dom'
import * as VehiclesService from '../Services/Vehicles'
import './../../css/Vehicles/newVehicle.css'

function NewVehicle () {
    const types = ['MOTOCICLETA', 'VEHÍCULO', 'CAMIÓN'];
    const colors = ['ROJO', 'VERDE', 'NEGRO', 'GRIS', 'AZUL', 'PLATEADO', 'BURDEO', 'BLANCO', 'AMARILLO', 'PLOMO', 'BEIGE', 'MARRÓN'];
    const [dni, setDni] = useState('');
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [domain, setDomain] = useState('');
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [type, setType] = useState('');
    const [color, setColor] = useState('');
    const [year, setYear] = useState('');
    const [chassis, setChassis] = useState('');
    const [insurance, setInsurance] = useState('');
    const [error, setError] = useState('');
    const deleteDiacritics = text => text.normalize('NFD').replace(/[\u0300-\u036f]/g,'');
    
    const handleSubmit = (event) => {
        event.preventDefault()
        // const client = {dni, phone, name, email} // TO-DO: GUARDAR DATA
        const vehicle = {domain, make, model, type, color, year, chassis, insurance, dni};
        if(domain !== '' && make !== '' && dni !== '') {
            VehiclesService.newVehicle(vehicle);
        } else {
            setError('Debe completar todos los campos requeridos');
            window.scroll(0,0);
        }
    };
    
    return (
        <div className="newVehicle">
            <div className="header">
                <p>Nuevo Vehículo</p>
            </div>
            {error && <div className="alert alert-danger text-center" role="alert">{error}</div>}
            <div className="content">
                <span className="text-muted">* Campos requeridos</span>
                <form action="#" onSubmit={handleSubmit}>
                    <div className="first-form">
                        <div className="header">
                            Propietario
                        </div>
                        <div className="form">
                            <div>
                                <div>
                                    <label htmlFor="dni">DNI</label>
                                    <input type="number" name="dni" id="dni" min={0} 
                                        onChange={(e) => setDni(e.target.value)}
                                        value={dni}
                                        placeholder="DNI *"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="phone">Teléfono</label>
                                    <input type="number" name="phone" id="phone" 
                                        onChange={(e) => setPhone(e.target.value)}
                                        value={phone}
                                        placeholder="Teléfono"
                                    />
                                </div>
                            </div>
                            <div>
                                <div>
                                    <label htmlFor="name">Nombre y Apellido</label>
                                    <input type="text" name="name" id="name" 
                                        onChange={(e) => setName(e.target.value)}
                                        value={name}
                                        placeholder="Nombre y Apellido"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email">Email</label>
                                    <input type="email" name="email" id="email" 
                                        onChange={(e) => setEmail(e.target.value)}
                                        value={email}
                                        placeholder="Email"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="second-form">
                        <div className="header">
                            Vehículo
                        </div>
                        <div className="form">
                            <div>
                                <div>
                                    <label htmlFor="domain">Dominio</label>
                                    <input name="domain" id="domain" type="text" placeholder="Dominio *"
                                        onChange={(e) => setDomain(e.target.value)}
                                        value={domain} 
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="make">Marca</label>
                                    <input name="make" id="make" type="text" placeholder="Marca *"
                                        onChange={(e) => setMake(e.target.value)}
                                        value={make} 
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <div>
                                    <label htmlFor="model">Modelo</label>
                                    <input name="model" id="model" type="text" placeholder="Modelo"
                                        onChange={(e) => setModel(e.target.value)}
                                        value={model} 
                                    />
                                </div>
                                <div>
                                    <label htmlFor="type">Tipo</label>
                                    <select 
                                        defaultValue={"0"}
                                        name="type"
                                        id="type"
                                        onChange={(e) => setType(e.target.value)}
                                    >
                                        <option value="0" disabled>Seleccione el tipo de vehículo</option>
                                        {types.map(type => {
                                            return (
                                                <option key={type} value={deleteDiacritics(type)}>{type}</option>
                                            );
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <label htmlFor="color">Color</label>
                                    <select 
                                        defaultValue={"0"}
                                        onChange={(e) => setColor(e.target.value)}
                                    >
                                        <option value="0" disabled>Seleccione un color</option>
                                        {colors.map(color => {
                                            return (
                                                <option key={color} value={deleteDiacritics(color)}>{color}</option>
                                            );
                                        })}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="year">Año</label>
                                    <input name="year" id="year" type="number" placeholder="Año" min={new Date().getFullYear() - 70} max={new Date().getFullYear()}
                                        onChange={(e) => setYear(Number(e.target.value))}
                                        value={year}
                                    />
                                </div>
                            </div>
                            <div>
                                <div>
                                    <label htmlFor="chassis">N° Chasis</label>
                                    <input name="chassis" id="chassis" type="text" placeholder="N° Chasis"
                                        onChange={(e) => setChassis(e.target.value)}
                                        value={chassis} 
                                    />
                                </div>
                                <div>
                                    <label htmlFor="insurance">Seguro</label>
                                    <input name="insurance" id="insurance" type="text" placeholder="Seguro"
                                        onChange={(e) => setInsurance(e.target.value)}
                                        value={insurance} 
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="buttons">
                        <button type="submit" className="btn__submit-form">Guardar</button>
                        <Link to='/vehicles' className="btn__back">Volver</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NewVehicle;