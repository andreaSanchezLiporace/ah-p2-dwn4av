import { useSession } from "../../contexts/session.context"
import '../../css/Profile.css'

function Profile () {
    const {profile} = useSession()
    return (
        <>
        <section>
            {/*PERFIL CON FOTO*/}
            <div className="row my-5 mx-5">
                <div className="col-lg-4">
                    <div className="card__profile card m-4">
                        <div className="card-body text-center">
                            <img src={profile.avatar} alt="avatar" className="rounded-circle img-fluid w-50"/>
                            <h5 className="my-3">Nombre de usuario: {profile.userName}</h5>
                            <p className="text-muted mb-1">Rol</p>
                        </div>
                    </div>
                </div>
            
                {/*DETALLE DATOS PROFILE*/}
                <div className="col-lg-7 my-4 mx-4">
                    <div className="card__profile card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm-3">
                                    <p className="mb-0">Nombre completo:</p>
                                </div>
                                <div className="col-sm-9">
                                    <p className="text-muted mb-0"></p>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-3">
                                    <p className="mb-0">Email:</p>
                                </div>
                                <div className="col-sm-9">
                                    <p className="text-muted mb-0"></p>
                                </div>
                            </div>
                    
                            <div className="row">
                                <div className="col-sm-3">
                                    <p className="mb-0">Teléfono:</p>
                                </div>
                                <div className="col-sm-9">
                                    <p className="text-muted mb-0"></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}

export default Profile;