import React, { useEffect, useMemo, useState } from "react";
import SpinnerLoading from "./SpinnerLoading";



export const DataRecords = ({ data, id }) => {
    const [dataFetch, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        fetch("http://localhost:3000/api/get-data", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id_auth0: id,
                search: data,
            }),
        })
            .then((response) => response.json())
            .then((data) => setData(data))
            .catch((err) => err.message)
            .finally(() => setIsLoading(false));
    }, [data]);




    return (
        <>
            <div className="history d-flex justify-content-center mt-5 bg-light shadow p-3 mb-5 bg-body-tertiary rounded">
                <h3 className="text-break">Historial de transformaciones</h3>
            </div>

            {
                isLoading ? (
                    <SpinnerLoading />
                )
                :

                <div className="data">
                    <div>
                        <h4>Dato</h4>
                        {
                            dataFetch.bin_dec.map((value, index) => (
                                <li key={index}>{value.binary}</li>
                            ))
                        }
                    </div>

                    <div>
                        <h4>Convertido</h4>
                        {
                            dataFetch.bin_dec.map((value, index) => (
                                <li key={index}>{value.converted_decimal}</li>
                            ))
                        }
                    </div>

                    <div>
                        <h4>Fecha</h4>
                        {
                            dataFetch.bin_dec.map((value, index) => (
                                <li key={index}>{value.date_converted}</li>
                            ))
                        }
                    </div>
                </div>


            }


        
    

            <nav aria-label="..." className="mt-5">
                <ul className="pagination">
                    <li className="page-item disabled">
                        <span className="page-link">Anterior</span>
                    </li>
                    <li className="page-item active">
                        <a className="page-link" href="#">
                            1
                        </a>
                    </li>
                    <li className="page-item">
                        <a className="page-link" href="#">
                            2
                        </a>
                    </li>
                    <li className="page-item">
                        <a className="page-link" href="#">
                            Siguiente
                        </a>
                    </li>
                </ul>
            </nav>
        </>
    );
};
