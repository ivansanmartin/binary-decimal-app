import React from "react";
import TextBinaryConverter from "/src/components/TextBinaryConverter"

const TextBinary = () => {
    return (
        <>
            <div className="title container-fluid d-flex flex-column align-items-center">
                <h4>Transforma texto a binario.</h4>
                <hr className="border border-primary border-2 opacity-50 w-100"></hr>
            </div>

            <p className="fw-light fs-4">¿Que texto deseas convertir?</p>

            <p className="fw-light fs-6">Introduce el texto para transformar</p>
    

            <TextBinaryConverter url="https://ivansanmartin.vercel.app/project/api/text_to_binary/" type="text"/>

          
        </>
    );
};

export default TextBinary;
