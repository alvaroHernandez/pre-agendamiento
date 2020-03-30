import {useEffect, useState} from "react";

const useFetch = (url) => {
    const [mediaItems, setMediaItems] = useState([]);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        setIsFetching(true);
        fetch(url)
            .then((response) => response.json())
            .then((json) => {
                setMediaItems(json);
                setIsFetching(false);
            })
            .catch((error) => {
                setMediaItems(false);
                setIsFetching(false);
            });
    },[]);

    return [isFetching, mediaItems];
}

export default useFetch
