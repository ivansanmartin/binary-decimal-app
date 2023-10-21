import React, { useEffect, useState } from "react";
import { DataRecords } from "../components/DataRecords";
import { useAuth0 } from "@auth0/auth0-react";
import useFetch from "src/useFetch";

const TextBinaryConverter = ({ url, type }) => {
    const [value, setValue] = useState("");
    const { user } = useAuth0();
    const { data, loading, error, setDataFetch } = useFetch();

    const handleChangeValue = (e) => {
        setValue(e.target.value);
    };

    return (
        <>
            <div className="text-transform d-flex flex-column align-items-center">
                <div className="input-group mb-3">
                    <span
                        className="input-group-text"
                        id="inputGroup-sizing-default"
                    >
                        {type == "text_bin"
                            ? "Texto"
                            : type == "bin_text"
                            ? "Binario"
                            : undefined}
                    </span>
                    <textarea
                        className="form-control"
                        onChange={handleChangeValue}
                        aria-label="With textarea"
                    ></textarea>
                </div>

                <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => {
                        setDataFetch({
                            url: url,
                            method: "POST",
                            jsonData: {
                                text: value,
                            },
                            typeNumber: type,
                        });
                    }}
                >
                    {loading ? (
                        <div
                            className="spinner-border text-primary"
                            role="status"
                        >
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    ) : (
                        "Transformar"
                    )}
                </button>
            </div>

            <div>
                {data &&
                    (data.ok ? (
                        <div className="converted container-fluid w-100 d-flex align-items-center flex-column text-light mt-5 shadow p-3 mb-5 bg-success rounded ">
                            <h4>¡Aquí tienes!</h4>

                            <div className="d-flex flex-column mt-4 text-wrap">
                                <p className="text-light text-break">
                                    Transformación:{" "}
                                    {type == "text_bin"
                                        ? data.text_converted
                                        : type == "bin_text"
                                        ? data.binary_convert
                                        : undefined}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="alert alert-warning mt-5" role="alert">
                            El valor ingresado no es válido.
                        </div>
                    ))}
            </div>
            <DataRecords
                id={user.sub}
                search={type}
                refresh={data || false}
                loading={loading}
            />
        </>
    );
};

export default TextBinaryConverter;
