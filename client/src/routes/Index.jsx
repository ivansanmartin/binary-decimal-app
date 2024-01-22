import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import ErrorAuth from "./CompleteAuth";
import SpinnerLoading from "../components/SpinnerLoading";
import "./../index.css"

function Index() {
    const { loginWithRedirect, isAuthenticated, isLoading, error, user } =
        useAuth0();

    if (isLoading) {
        return <SpinnerLoading />;
    }

    if (error) {
        console.log(user);
        return <ErrorAuth />;
    }


    return (

        <>
            <header className="container-fluid d-flex justify-content-around mt-5">
                <div className="logo">
                    <a href="/">Binary Decimal App</a>
                </div>



                <div className="login-register">
                    {isAuthenticated ? (
                        <a href="/dashboard">Dashboard</a>
                    ) : (
                        <a href="" className="" onClick={() => loginWithRedirect()}>
                            Iniciar sesión →
                        </a>
                    )}
                </div>
            </header>

            <main>
                <section className="app-information text-break">
                    <div className="title">
                        <div>
                            <h1 className="fw-bold text-white">¡Descubre el mundo binario!</h1>
                            <p className="text-white mt-4 fs-6">Convierte números y texto en emocionantes códigos binarios y desentraña sus secretos con nuestra increíble herramienta de transformación.</p>
                        </div>

                        <div className="btn-info">
                            <button className="btn btn-primary fw-bold" onClick={() => loginWithRedirect()}>Comenzar</button>
                            <a href="#learn-more" className="fw-bold">Leer más →</a>
                        </div>
                    </div>

                    <div className="image">
                        <img className="img-fluid" src="https://res.cloudinary.com/dxupqwg5l/image/upload/zohbwcqczr1irctekxmm.jpg" alt="" />
                    </div>
                </section>


                <section className="learn-more" id="learn-more">
                    <div className="info">
                        <h1 className="fw-bold text-white">¿Cómo fue realizada esta aplicación?</h1>

                    </div>

                </section>

            </main>
        
        </>

    );
}

export default Index;
