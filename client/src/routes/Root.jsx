import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import SpinnerLoading from "../components/SpinnerLoading";
import "./../root.css"

function Root() {
    const { logout, isAuthenticated, isLoading, user } = useAuth0();

    if (isLoading) {
        return <SpinnerLoading />;
    }
    return isAuthenticated ? (
        <>

           <div className="container-fluid d-flex vh-100 p-5 ">
             <div className="card d-flex align-items-center h-30 shadow p-3 mb-5 bg-body-tertiary rounded" style={{width: "18rem", background: "#FFF", height: "35vh"}}>
                <div className="d-flex align-items-center justify-content-center flex-column">
                    <img src={user.picture} className="card-img-top w-50"/>
                    <div className="card-body d-flex flex-column align-items-center ">
                        <h5 className="card-title">{user.nickname}</h5>
                        <p className="card-text text-center">Bienvenido {user.nickname}, ¡disfruta la aplicación!</p>
                        <Link className="btn btn-primary" onClick={() =>
                                logout({
                                    logoutParams: {
                                        returnTo: window.location.origin,
                                    },
                                })
                            }
                        >Cerrar sesión</Link>
                    </div>
                </div>

            </div>

            

            
            <div className="container-fluid d-flex flex-column align-items-center">
                <ul className="shadow-lg p-3 mb-5 bg-body-tertiary rounded">
                    <li>
                        <Link to="/dashboard/binary-to-decimal" className="btn btn-light">Binario a decimal</Link>
                    </li>
                    <li>
                        <Link to="/dashboard/decimal-to-binary" className="btn btn-light">Decimal a binario</Link>
                    </li>
                    <li>
                        <Link to="/dashboard/text-to-binary" className="btn btn-light">Texto a binario</Link>
                    </li>

                    <li>
                        <Link to="/dashboard/binary-to-text" className="btn btn-light">Binario a texto</Link>
                    </li>
                </ul>


                <div id="detail" className="container-fluid">
                    <Outlet />
                </div>
            </div>

            

           </div>



        </>
    ) : (
        <div className="d-flex container-fluid w-50 flex-column justify-content-center align-items-center vh-100">
            <p className="text-light"></p>
            <p className="text-warning text-wrap text-center">
                Acceso restringido: Por favor inicia sesión o registrate para
                obtener acceso a todas las funcionalidades de la aplicación web.
            </p>
            <Link to={"/"}>Volver al inicio</Link>
        </div>
    );
}

export default Root;
