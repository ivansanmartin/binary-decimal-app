import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import ErrorAuth from "./CompleteAuth";
import SpinnerLoading from "../components/SpinnerLoading";
import "./../index.css";

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
              <h1 className="fw-bold text-white">
                ¡Descubre el mundo binario!
              </h1>
              <p className="text-white mt-4 fs-6">
                Convierte números y texto en emocionantes códigos binarios y
                desentraña sus secretos con nuestra increíble herramienta de
                transformación.
              </p>
            </div>

            <div className="btn-info">
              <button
                className="btn btn-primary fw-bold"
                onClick={() => loginWithRedirect()}
              >
                Comenzar
              </button>
              <a href="#learn-more" className="fw-bold">
                Leer más →
              </a>
            </div>
          </div>

          <div className="image">
            <img
              className="img-fluid"
              src="https://res.cloudinary.com/dxupqwg5l/image/upload/zohbwcqczr1irctekxmm.jpg"
              alt=""
            />
          </div>
        </section>

        <section className="learn-more" id="learn-more">
          <div className="info">
            <h1 className="fw-bold text-white">
              ¿Cómo fue creada esta aplicación?
            </h1>
            <p className="text-white mt-4">
              Nuestra aplicación web se ha construido con excelencia gracias a
              la API REST creada por <a href="https://ivansanmartin.github.io/" target="_blank">Iván San Martín</a>, proporcionando el 90% de
              su funcionalidad. Esta API destaca por su eficiencia y
              versatilidad, ofreciendo un sólido conversor de números binarios a
              decimales y viceversa.
            </p>

            <p className="text-white">
              Desarrollada pensando especialmente en programadores juniors que
              buscan mejorar sus habilidades en el frontend, la API Binary
              Decimal se presenta como una herramienta esencial para aquellos
              que desean demostrar su capacidad para consumir REST APIs y
              mostrar datos de manera efectiva en sus aplicaciones.
            </p>

            <a className="btn btn-primary fw-bold" href="https://ivansanmartin.vercel.app/project" target="_blank">Ver documentación</a>
          </div>
        </section>
      </main>

      <footer>
        <div className="info">
            <h4>Binary Decimal App</h4>
            <p>Proyecto open-source</p>
        </div>

        <div className="links">
            <ul>
                <li><a href="">GitHub</a></li>
            </ul>
        </div>

        <div className="copyrights">
            <p>Iván San Martín - 2024</p>
        </div>
      </footer>


    </>
  );
}

export default Index;
