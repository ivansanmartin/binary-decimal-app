import React from "react";

const BinaryText = () => {
    return (
        <>
            <h1 className="text-primary fw-bold mb-5">PRÓXIMA ACTUALIZACIÓN</h1>
            <div className="title container-fluid d-flex flex-column align-items-center">
                <h4>Transforma binario a texto.</h4>
                <hr className="border border-primary border-2 opacity-50 w-100"></hr>
            </div>

            <div className="text-transform d-flex flex-column align-items-center">
                <p className="fw-light fs-4">¿Que binario deseas convertir?</p>

                <p className="fw-light fs-6">Introduce el binario</p>
                <div className="input-group mb-3">
                    <span
                        className="input-group-text"
                        id="inputGroup-sizing-default"
                    >
                        Binario
                    </span>
                    <textarea
                        className="form-control"
                        aria-label="With textarea"
                    ></textarea>
                </div>

                <button
                    type="button"
                    className="btn btn-success"
                    data-bs-toggle="modal"
                    data-bs-target="#transformModal"
                >
                    Transformar
                </button>

                <div
                    className="modal fade"
                    id="transformModal"
                    tabIndex="-1"
                    aria-labelledby="trasnformModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1
                                    className="modal-title fs-5"
                                    id="transformModalLabel"
                                >
                                    <i className="fa-solid fa-wand-magic-sparkles"></i>{" "}
                                    Transformación exitosa{" "}
                                </h1>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body">
                                Aquí tienes tu texto:
                            </div>

                            <div className="modal-body d-flex gap-4 justify-content-center text-primary fw-bold fs-3 mb-4">
                                binary
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                >
                                    Cerrar
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    data-bs-dismiss="modal"
                                >
                                    Guardar en el historial
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="history d-flex justify-content-center mt-5 bg-light shadow p-3 mb-5 bg-body-tertiary rounded">
                <h3 className="text-break">Historial de transformaciones</h3>
            </div>
        </>
    );
};

export default BinaryText;
