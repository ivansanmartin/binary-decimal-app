import React, { useEffect, useState } from "react";
import { Link, Outlet, useFetcher } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import SpinnerLoading from "../client/src/components/SpinnerLoading";
import "./../root.css";

import axios from "axios";

function Root() {
    const { logout, isAuthenticated, isLoading, user } = useAuth0();
    const [randomPicture, setPicture] = useState("");

    document.body.style.backgroundColor = "#EEEEEE";

    if (isLoading) {
        return <SpinnerLoading />;
    }

    return isAuthenticated ? (
        <>
            <div className="content container-fluid d-flex p-5">
                <div className="card d-flex align-items-center justify-content-center shadow p-3 mb-5 bg-body-tertiary rounded">
                    <div className="card-content  d-flex align-items-center justify-content-center flex-column">
                        <img
                            src={`https://robohash.org/${user.nickname}`}
                            className="card-img-top w-50"
                        />
                        <div className="card-body text-break d-flex flex-column align-items-center">
                            <h5 className="card-title">{user.nickname}</h5>
                            <p className="card-text text-center">
                                Te damos la bienvenida.
                            </p>
                            <p className="card-text text-center">
                                ¡Disfruta la aplicación!
                            </p>
                            <Link
                                className="btn btn-danger"
                                onClick={() =>
                                    logout({
                                        logoutParams: {
                                            returnTo: window.location.origin,
                                        },
                                    })
                                }
                            >
                                Cerrar sesión
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="nav-root container-fluid d-flex flex-column align-items-center">
                    <ul className="links container-fluid shadow-lg p-3 mb-5 bg-body-tertiary rounded">
                        <li>
                            <Link
                                to="/dashboard/binary-to-decimal"
                                className="btn btn-light text-break"
                            >
                                Binario a decimal
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/dashboard/decimal-to-binary"
                                className="btn btn-light text-break"
                            >
                                Decimal a binario
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/dashboard/text-to-binary"
                                className="btn btn-light text-break"
                            >
                                Texto a binario
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/dashboard/binary-to-text"
                                className="btn btn-light text-break"
                            >
                                Binario a texto
                            </Link>
                        </li>
                    </ul>

                    <div
                        id="detail"
                        className="detail container-fluid d-flex flex-column align-items-center"
                    >
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
