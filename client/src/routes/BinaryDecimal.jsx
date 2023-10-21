import React from "react";
import NumbersBinary from "src/components/NumbersBinary";

const BinaryDecimal = () => {
    return (
        <>
            <div className="title container-fluid d-flex flex-column align-items-center">
                <h4>Transforma de binario a decimal.</h4>
                <hr className="border border-primary border-2 opacity-50 w-100"></hr>
            </div>

            <p className="fw-light fs-4">¿Que binario deseas convertir?</p>

            <p className="fw-light fs-6">Introduce el número binario</p>
            <NumbersBinary
                url="https://ivansanmartin.vercel.app/project/api/binary_to_decimal/"
                type="binary"
            />
        </>
    );
};

export default BinaryDecimal;
