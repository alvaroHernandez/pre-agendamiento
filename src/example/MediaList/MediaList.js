import React, {useEffect, useState} from 'react';
import './styles.scss'
import MediaItem from "../MediaItem/MediaItem";
import Loader from "../Loader/Loader";


const MediaList  = (props) =>  {

    const [mediaItems, setMediaItems] = useState([]);
    const [favourites, setFavourites] = useState({});
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        setIsFetching(true);
        fetch(props.api)
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

    const addToFavourites = (itemName) => {
        setFavourites({...favourites, [itemName] : true});
    };

    const removeFromFavourites = (itemName) => {
        setFavourites({...favourites, [itemName] : false});
    };

    const renderLoading = () => {
        return <div className={"loader-container"}>
            <Loader/>
        </div>;
    };

    const renderMediaList = () => {
        return <div className="movies-scroll">
            <ul>
                {mediaItems &&
                    mediaItems.map(
                        item =>
                            <li key={item.Name}>
                                <MediaItem
                                    isFavorite={favourites[item.Name]}
                                    movie={item} addToFavourites={addToFavourites}
                                    removeFromFavourites={removeFromFavourites}
                                />
                            </li>
                    )
                }
            </ul>

        </div>;
    }

    const { title } = props;

    return (
            <div className="container">
                <div className="box">
                    <div className="title">
                        <h1>{title}</h1>
                    </div>
                    <div className="content">
                        {
                            isFetching ?
                                renderLoading() :
                                renderMediaList()
                        }
                    </div>
                </div>
            </div>
    )
};

export default MediaList;
