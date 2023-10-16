import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const useFetch = () => {
    const { user } = useAuth0();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [typeFetch, setNumber] = useState(null);
    const [dataFetch, setDataFetch] = useState({
        url: "",
        method: "",
        typeNumber: "",
        jsonData: "",
    });

    useEffect(() => {
        let typeFetch =
            dataFetch.typeNumber == "binary"
                ? "http://localhost:3000/api/binary-decimal/save-data"
                : dataFetch.typeNumber == "decimal"
                ? "http://localhost:3000/api/decimal-binary/save-data"
                : dataFetch.typeNumber == "text_bin"
                ? "http://localhost:3000/api/text-binary/save-data"
                : undefined;
        setNumber(typeFetch);
    }, [dataFetch.typeNumber, dataFetch.url]);

    useEffect(() => {
        setLoading(true);
        fetch(dataFetch.url, {
            method: dataFetch.method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataFetch.jsonData),
        })
            .then((response) => response.json())
            .then((data) => setData(data))
            .catch((error) => setError(error))
            .finally(() => setLoading(false));
    }, [dataFetch.url, dataFetch.jsonData]);

    useEffect(() => {
        if (data == null) {
            return;
        } else {
            setLoading(true);
            fetch(typeFetch, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id_auth0: user.sub,
                    fetch: data,
                }),
            })
                .then((response) => response.json())
                .then((error) => error.message)
                .finally(() => setLoading(false))
        }

        // {ok: true, binary_number: '11111111', decimal_convert: '255', conversion_date: '24/9/2023'}
    }, [data]);

    return { data, loading, error, setDataFetch };
};

export default useFetch;
