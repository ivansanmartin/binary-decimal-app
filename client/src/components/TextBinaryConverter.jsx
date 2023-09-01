import React, { useEffect, useState } from "react";
import useFetch from "src/useFetch";


const TextBinaryConverter = ({url, type}) => {
    const [value, setValue] = useState("")
    const {data, loading, error, setDataFetch} = useFetch()

    const handleChangeValue = (e) => {
        setValue(e.target.value)
    }

  return (
    <>

        <div className="text-transform d-flex flex-column align-items-center">
            <div className="input-group mb-3">
                <span
                    className="input-group-text"
                    id="inputGroup-sizing-default"
                >
                    {type == "text" ? "Texto" : type == "binary" ? "Binario" : undefined}
                </span>
                <textarea className="form-control" onChange={handleChangeValue} aria-label="With textarea"></textarea>
            </div>

            <button type="button" className="btn btn-success" onClick={() => {
                    setDataFetch({
                        url: url,
                        method: "POST",
                        jsonData: {
                            text: value
                        }
                    
                    })
                }}>{loading ? 

                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                
                
                : "Transformar"}
            </button>

        </div>

        <div>
            {
                data && (
                    data.ok ? (
                    <div className="converted container-fluid w-100 d-flex align-items-center flex-column text-light mt-5 shadow p-3 mb-5 bg-success rounded ">
                        <h4>¡Aquí tienes!</h4>
                        
                        <div className="d-flex flex-column mt-4 text-wrap">
                            <p className="text-light text-break">Transformación: {type == "text" ? data.text_converted : type == "binary" ? data.binary_convert : undefined}</p>
                        </div>
                        
                    </div>
                    )
                    :
                    (
                    <div className="alert alert-warning mt-5" role="alert">
                        El valor ingresado no es válido.
                    </div>
                    )
                )
            }
        </div>

        <div className="history d-flex justify-content-center mt-5 bg-light shadow p-3 mb-5 bg-body-tertiary rounded">
            <h3 className="text-break">Historial de transformaciones</h3>
        </div>
    </>
  )
}

export default TextBinaryConverter