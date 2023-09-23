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
        <header className="container-fluid d-flex justify-content-around mt-5">
            <div className="logo">
                <a href="/">Binary Decimal App</a>
            </div>

            <div className="nav">
                <a href="" className="">
                    Características
                </a>
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
    );
}

export default Index;
