import React from "react";
import NumbersBinary from "/src/components/NumbersBinary"

const DecimalBinary = () => {
    return (
        <>
        
            <div className="title container-fluid d-flex flex-column align-items-center">
                <h4>Transforma de decimal a binario.</h4>
                <hr className="border border-primary border-2 opacity-50 w-100"></hr>
            </div>
            
            <p className="fw-light fs-4">¿Que decimal deseas convertir?</p>

            <p className="fw-light fs-6">Introduce el número decimal</p>
            <NumbersBinary url="https://ivansanmartin.vercel.app/project/api/decimal_to_binary/" type="decimal"/>

        </>

    )

};

export default DecimalBinary;
