import {useEffect, useState} from "react";

const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetch(url)
            .then((response) => response.json())
            .then((json) => {
                setData(json);
                setIsLoading(false);
            })
            .catch((error) => {
                setData(false);
                setIsLoading(false);
            })
    },[]);

    return [isLoading, data];
}

export default useFetch
