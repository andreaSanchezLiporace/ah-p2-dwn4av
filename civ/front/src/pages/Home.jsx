import { Link } from "react-router-dom"
import './../css/home.css'
import './../css/buttons.css'
import Carousel from 'react-bootstrap/Carousel';

function Home (){
    return(
        <>
            <section className='home__header'>
                <div>
                    <p className='h2 font-weight-bold m-5 font-family-alata'>Mucho más que un Sistema<br/> de Gestión para tu Taller</p>
                </div>
                <div className='image'>
                    <img src="/home__header.png" alt="Imagen de Mecánica" />
                </div>
            </section>
            <section className="separator">
                <img src="/separator.png" alt="Separador de secciones" />
            </section>
            <section className='home__section_1 my-5'>
                <div className='text-center mt-5'>
                    <h2>Impulsamos tu negocio con un sistema</h2>
                </div>
                <div className='logos'>
                    <div>
                        <img src="/confiable-logo.png" alt="Imagen representativa de confiabilidad" />
                        <h3 className='font-family-alata'>CONFIABLE</h3>
                    </div>
                    <div>
                        <img src="/dinamico-logo.png" alt="Imagen representativa de dinamismo" />
                        <h3 className='font-family-alata'>DINÁMICO</h3>
                    </div>
                    <div>
                        <img src="/robusto-logo.png" alt="Imagen representativa de robustez" />
                        <h3 className='font-family-alata'>ROBUSTO</h3>
                    </div>
                    <div>
                        <img src="/atractivo-logo.png" alt="Imagen representativa de atractivo" />
                        <h3 className='font-family-alata'>ATRACTIVO</h3>
                    </div>
                </div>
            </section>
            <section className="separator">
                <img src="/separator.png" alt="Separador de secciones" />
            </section>
            <section className='home__section_2'>
                <div>
                    <p className="h2 font-weight-bold mx-auto mb-0 py-5 text-center">
                        Que estimule a tus empleados y les facilite el trabajo diario, permitiendo optimizar los tiempos de atención y gestión de las órdenes de trabajo
                    </p>
                </div>
            </section>
            <section className="separator">
                <img src="/separator.png" alt="Separador de secciones" />
            </section>
            <section className="home__section_3">
                <p className="h2 mb-5">
                    Con <strong>ESPARTA</strong> podrás
                </p>
                <div className="slider">
                    <Carousel variant="dark">
                        <Carousel.Item>
                            <img
                                className="d-block w-100 carousel-img"
                                src="/slider1.jpg"
                                alt="First slide"
                            />
                            <p>Crear usuarios (tanto para tus empleados como para aquellos clientes que necesiten de tu ayuda inicial para comenzar a usar el sistema), cargar datos de los vehículos y asociarlos a un cliente, crear órdenes de trabajo y asociarlas a un vehículo.</p>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100 carousel-img"
                                src="/slider2.png"
                                alt="Second slide"
                            />
                            <p>Llevar un control de las órdenes de trabajo y darles seguimiento desde su creación hasta que el cliente retira su vehículo de tu establecimiento.</p>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100 carousel-img"
                                src="/slider3.png"
                                alt="Third slide"
                            />
                            <p>Consultar y descargar el listado de vehículos ingresados en el sistema con datos como, por ejemplo: a que cliente pertenece, los trabajos que se le han realizado, incluso aquellos que se encuentran en proceso, etc.</p>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100 carousel-img"
                                src="/slider4.png"
                                alt="Third slide"
                            />
                            <p>Brindarle a tus clientes una App, a través de la cual le podrás hacer llegar el presupuesto del servicio para su aprobación, hacer el seguimiento de la reparación, verificar la fecha de finalización del trabajo y de entrega del automóvil.</p>
                        </Carousel.Item>
                    </Carousel>
                </div>
            </section>
            <section className="separator">
                <img src="/separator.png" alt="Separador de secciones" />
            </section>
            <section className='home__section_4'>
                <div>
                    <p className="h2 font-weight-bold mb-0 py-5 text-center">
                        Somos la solución perfecta para ayudarte a organizar la parte administrativa de tu taller y mejorar la relación con tus clientes
                    </p>
                </div>
            </section>
            <section className="separator">
                <img src="/separator.png" alt="Separador de secciones" />
            </section>
            <section className="home__section_5">
                <div>
                    <p className="h2 font-weight-bold mb-5 text-center">
                        Animate a innovar con nosotros y descubrí una nueva forma de manejar tu empresa
                    </p>
                    <div className='btn_create_account'>
                        <Link
                            to={'/register'}
                        >
                            <button className='btn__home__create_account font-family-alata'>Crear cuenta</button>
                        </Link>
                    </div>
                    {/* <div className='btn_create_account'>
                        <button className='btn__home__create_account font-family-alata'>Crear cuenta</button>
                    </div> */}
                </div>
            </section>
            <section className="separator">
                <img src="/separator.png" alt="Separador de secciones" />
            </section>
        </>
    )
}

export default Home