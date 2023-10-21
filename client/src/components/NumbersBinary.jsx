import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { DataRecords } from "../components/DataRecords";
import useFetch from "src/useFetch";

export const NumbersBinary = ({ url, type }) => {
    const [number, setNumber] = useState("");
    const [isCheckedIpv4, setChecked] = useState("");
    const { user } = useAuth0();
    const { data, loading, error, setDataFetch } = useFetch();

    const handleCheckedIpv4 = (e) => {
        setChecked(e.target.checked);
    };

    const handleChangeNumber = (e) => {
        setNumber(e.target.value);
    };
    return (
        <>
            <div className="binary-transform d-flex flex-column align-items-center">
                <div className="input-group mb-3">
                    <span
                        className="input-group-text"
                        id="inputGroup-sizing-default"
                    >
                        {type == "decimal"
                            ? "Decimal"
                            : type == "binary"
                            ? "Binario"
                            : undefined}
                    </span>
                    <input
                        type="number"
                        onChange={handleChangeNumber}
                        className="form-control"
                        aria-label="Sizing example input"
                        placeholder={
                            type == "decimal"
                                ? "255"
                                : type == "binary"
                                ? "11111111"
                                : undefined
                        }
                        aria-describedby="inputGroup-sizing-default"
                    />
                </div>

                {type == "decimal" ? (
                    <div className="form-check form-switch mb-3">
                        <input
                            className="form-check-input"
                            onChange={handleCheckedIpv4}
                            type="checkbox"
                            id="padding-ipv4"
                        />
                        <label
                            className="form-check-label"
                            htmlFor="padding-ipv4"
                        >
                            Rellenar en formato 8 bits
                        </label>
                    </div>
                ) : (
                    false
                )}

                <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => {
                        setDataFetch({
                            url: isCheckedIpv4
                                ? `${url}${number}?padding_ipv4=true`
                                : `${url}${number}`,
                            method: "GET",
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
                                    {type == "binary"
                                        ? data.decimal_convert
                                        : type == "decimal"
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

export default NumbersBinary;
