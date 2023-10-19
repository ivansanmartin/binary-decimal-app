import React, { useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import useFetch from "src/useFetch";
import SpinnerLoading from "./SpinnerLoading";

export const DataRecords = ({ id, search, refresh, loading }) => {
  const [dataFetch, setData] = useState([]);
  const [convertedFetch, setConverted] = useState([]);
  const [conversionDate, setDate] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);


  useEffect(() => {
    if (refresh.ok || !refresh) {
      if (!loading) {
        setIsLoading(true);
        fetch("http://localhost:3000/api/get-data", {
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

            for (let i = 0; i < fetching.length; i += 10) {
              const chunk = fetching.slice(i, i + 10);
              chunks.push(chunk);
            }

            setData(chunks);
            setPages(chunks.length);
          })
          .catch((err) => err.message)
          .finally(() => setIsLoading(false));
      }
    }
  }, [search, loading]);

  // <button class="btn btn-primary w-100" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
  //     Ver
  // </button>

  // <div class="collapse w-100" id="collapseExample">
  //     <div class="card card-body w-100">
  //         Algo
  //     </div>
  // </div>
  const generateHTML = (number, index) => {
    if (number?.length > 20) {
      return (

        <>
            <button className="btn btn-success" onClick={() => {navigator.clipboard.writeText(number)}}>Copiar para ver</button> 
        </>

      );
    } else {
      return <span>{number}</span>;
    }
  };

  return (
    <>
      <div
        className="history d-flex justify-content-center mt-5 bg-light shadow p-3 mb-5 bg-body-tertiary rounded"
        id="records"
      >
        <h3 className="text-break">Historial de transformaciones</h3>
      </div>

      {isLoading ? (
        <SpinnerLoading />
      ) : (
        <div className="data">
          <div>
            <h4>Dato</h4>
            {dataFetch[currentPage].map((value, index) => (
              <li key={index} className="">
                {search == "decimal"
                  ? generateHTML(value.decimal)
                  : search == "binary"
                  ? generateHTML(value.binary)
                  : search == "text_bin"
                  ? generateHTML(value.text)
                  : null
                }

                
              </li>
            ))}
          </div>

          <div>
            <h4>Convertido</h4>

            {dataFetch[currentPage].map((value, index) => (
              <li key={index} className="">
                {search == "decimal"
                  ? generateHTML(value.converted_binary)
                  : search == "binary"
                  ? generateHTML(value.converted_decimal)
                  : search == "text_bin"
                  ? generateHTML(value.text_converted)
                  : null}
              </li>
            ))}
          </div>

          <div>
            <h4>Fecha</h4>
            {dataFetch[currentPage].map((value, index) => (
              <li key={index} className="mt-3 p-1">{value.date_converted}</li>
            ))}
          </div>
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
