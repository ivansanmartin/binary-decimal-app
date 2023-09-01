import {useEffect, useState} from 'react'

const useFetch = () => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [dataFetch, setDataFetch] = useState({
        url: "",
        method: "",
        jsonData: ""
    })

    
    useEffect(() => {
        setLoading(true)
        fetch(dataFetch.url, {
            method: dataFetch.method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataFetch.jsonData)

        })
            .then((response) => response.json())
            .then((data) => setData(data))
            .catch((error) => setError(error))
            .finally(() => setLoading(false))

    }, [dataFetch])

    return {data, loading, error, setDataFetch}
    
}

export default useFetch