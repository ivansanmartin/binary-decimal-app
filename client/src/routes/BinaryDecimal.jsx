import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import useFetch from "./useFetch";



// Get number from input
// Create a hook wich recibe url fetching and number from input

const BinaryDecimal = () => {
    const [binary, setBinary] = useState("")
    const {data, loading, error, setDataFetch} = useFetch()


    const handleChangeBinary = (e) => {
        setBinary(e.target.value)
    }

    
    return (
        <>
            <div className="title container-fluid d-flex flex-column align-items-center">
                <h4>Transforma de binario a decimal.</h4>
                <hr className="border border-primary border-2 opacity-50 w-100"></hr>

            </div>

            <div className="binary-transform mt-5 d-flex flex-column align-items-center">
                <p className="fw-light fs-4">¿Que binario deseas convertir?</p>

                <p className="fw-light fs-6">Introduce el número binario</p>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-default">Binario</span>
                    <input type="number" onChange={handleChangeBinary} className="form-control" aria-label="Sizing example input" placeholder="11111111" aria-describedby="inputGroup-sizing-default" />
                </div>

                <button type="button" className="btn btn-success" onClick={() => {
                    setDataFetch({
                        url: `https://ivansanmartin.vercel.app/project/api/binary_to_decimal/${binary}`,
                        method: "GET",
                    
                    })
                }}>{loading ? 

                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                
                
                : "Transformar"}</button>

            </div>

            <div>
                {
                    data && (
                        data.ok ? (
                        <div className="converted container-fluid w-100 d-flex align-items-center flex-column text-light mt-5 shadow p-3 mb-5 bg-success rounded ">
                            <h4>¡Aquí tienes!</h4>
                            
                            <div className="d-flex word-wrap flex-column mt-4">
                                <p className="text-light">Número decimal: {data.decimal_convert}</p>
                                <p className="text-light">Fecha de conversión: {data.conversion_date}</p>
                            </div>
                            
                        </div>
                        )
                        :

                        (

                        <div class="alert alert-warning mt-5" role="alert">
                            El número binario no es válido.
                        </div>
                        )

                    )
                }
            </div>

            <div className="history d-flex justify-content-center mt-5 bg-light shadow p-3 mb-5 bg-body-tertiary rounded">
                <h3 className="text-break">Historial de transformaciones</h3>
                        
            </div>
            
        </>
    );
}

export default BinaryDecimal;
