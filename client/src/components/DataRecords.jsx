import React, { useEffect, useMemo, useState } from "react";
import SpinnerLoading from "./SpinnerLoading";

export const DataRecords = ({ id, search, refresh, loading }) => {
    const [dataFetch, setData] = useState([]);
    const [chunkData, setChunkData] = useState([]);
    const [chunkConverted, setChunkConverted] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pages, setPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [expandedIndexes, setExpandedIndexes] = useState([]);
    const [expandedIndexes2, setExpandedIndexes2] = useState([]);

    useEffect(() => {
        if (refresh.ok || !refresh) {
            if (!loading) {
                setIsLoading(true);
                fetch("https://binary-decimal-server.vercel.app/api/get-data", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id_auth0: id,
                        search: search,
                    }),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        let fetching =
                            search == "decimal"
                                ? data.dec_bin.reverse()
                                : search == "binary"
                                ? data.bin_dec.reverse()
                                : search == "text_bin"
                                ? data.text_bin.reverse()
                                : null;
                        const chunks = [];
                        const converted = [];
                        const fact = [];

                        for (let i = 0; i < fetching.length; i += 10) {
                            const chunk = fetching.slice(i, i + 10);
                            chunks.push(chunk);
                        }

                        setData(chunks);
                        setPages(chunks.length);

                        for (let i = 0; i < chunks.length; i++) {
                            for (let j = 0; j < chunks[i].length; j++) {
                                if (search == "binary") {
                                    fact.push(chunks[i][j].binary);
                                    converted.push(
                                        chunks[i][j].converted_decimal
                                    );
                                } else if (search == "decimal") {
                                    fact.push(chunks[i][j].decimal);
                                    converted.push(
                                        chunks[i][j].converted_binary
                                    );
                                } else if (search == "text_bin") {
                                    fact.push(chunks[i][j].text);
                                    converted.push(chunks[i][j].text_converted);
                                } else {
                                    console.log("Error");
                                }
                            }
                        }

                        let chunksData = [];
                        let chunksConverted = [];

                        for (let i = 0; i < converted.length; i += 10) {
                            const chunk = converted.slice(i, i + 10);
                            chunksConverted.push(chunk);
                        }

                        for (let i = 0; i < fact.length; i += 10) {
                            const chunk = fact.slice(i, i + 10);
                            chunksData.push(chunk);
                        }

                        setChunkData(chunksData);
                        setChunkConverted(chunksConverted);
                    })
                    .catch((err) => err.message)
                    .finally(() => setIsLoading(false));
            }
        }
    }, [search, loading]);

    return (
        <>
            <div
                className="history d-flex justify-content-center w-100 mt-5 bg-light shadow p-3 mb-5 bg-body-tertiary rounded"
                id="records"
            >
                <h3 className="text-break">Historial de transformaciones</h3>
            </div>

            {dataFetch.length == 0 && !isLoading ? (
                <div className="alert alert-warning">No existen registros</div>
            ) : isLoading ? (
                <SpinnerLoading />
            ) : (
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Dato</th>
                                <th>Convertido</th>
                                <th>Fecha</th>
                            </tr>
                        </thead>
                        <tbody>
                            {chunkData[currentPage].map((value, index) => (
                                <tr key={index}>
                                    <td
                                        className="text-break"
                                        role="button"
                                        onClick={() => {
                                            if (value?.length > 10) {
                                                setExpandedIndexes(
                                                    (prevIndexes) =>
                                                        prevIndexes.includes(
                                                            index
                                                        )
                                                            ? prevIndexes.filter(
                                                                  (i) =>
                                                                      i !==
                                                                      index
                                                              )
                                                            : [
                                                                  ...prevIndexes,
                                                                  index,
                                                              ]
                                                );
                                            }
                                        }}
                                    >
                                        {value.length > 10 &&
                                        !expandedIndexes.includes(index)
                                            ? value.slice(0, 10) + "..."
                                            : value}
                                    </td>

                                    <td
                                        className="text-break"
                                        role="button"
                                        onClick={() => {
                                            if (value?.length > 10) {
                                                setExpandedIndexes2(
                                                    (prevIndexes) =>
                                                        prevIndexes.includes(
                                                            index
                                                        )
                                                            ? prevIndexes.filter(
                                                                  (i) =>
                                                                      i !==
                                                                      index
                                                              )
                                                            : [
                                                                  ...prevIndexes,
                                                                  index,
                                                              ]
                                                );
                                            }
                                        }}
                                    >
                                        {value?.length > 10 &&
                                        !expandedIndexes2.includes(index)
                                            ? value.slice(0, 10) + "..."
                                            : value}
                                    </td>

                                    <td className="text-break">
                                        {
                                            dataFetch[currentPage][index]
                                                ?.date_converted
                                        }
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <nav aria-label="..." className="mt-5">
                <ul className="pagination">
                    {currentPage > 0 ? (
                        <li className="page-item">
                            <a
                                className="page-link"
                                href="#records"
                                onClick={() => {
                                    setCurrentPage(currentPage - 1);
                                }}
                            >
                                Anterior
                            </a>
                        </li>
                    ) : (
                        <li className="page-item disabled">
                            <span className="page-link">Anterior</span>
                        </li>
                    )}

                    <li className="page-item active">
                        <a className="page-link" href="#records">
                            {currentPage + 1}
                        </a>
                    </li>
                    {currentPage + 1 != pages ? (
                        <li className="page-item">
                            <a
                                className="page-link"
                                href="#records"
                                onClick={() => {
                                    setCurrentPage(currentPage + 1);
                                }}
                            >
                                Siguiente
                            </a>
                        </li>
                    ) : (
                        <li className="page-item disabled">
                            <span className="page-link">Siguiente</span>
                        </li>
                    )}
                </ul>
            </nav>
        </>
    );
};
