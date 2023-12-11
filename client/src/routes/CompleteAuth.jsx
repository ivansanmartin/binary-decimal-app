import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

function ErrorAuth() {
    const { logout, error, user } = useAuth0();

    const logInOtherAccount = () => {
        return logout();
    };

    return (
        <>
            <div className="d-flex container-fluid w-50 flex-column justify-content-center align-items-center vh-100">
                <p className="text-light">{error.message}</p>
                <p className="text-success text-wrap text-center">
                    ¡Gracias por registrarte en Binary Decimal App! Se ha
                    enviado un enlace de verificación a tu dirección de correo
                    electrónico. Una vez que verifiques tu correo electrónico,
                    podrás acceder a todas las funcionalidades emocionantes que
                    la aplicación tiene para ofrecer.
                </p>
                <Link to={"/"} onClick={logInOtherAccount}>
                    Volver al inicio
                </Link>
            </div>
        </>
    );
}

export default ErrorAuth;
