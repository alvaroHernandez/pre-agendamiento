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

    const removeFromFavourites = () => {
        setFavourites([]);
    };

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
                                <div className={"loader-container"}>
                                   <Loader/>
                                </div> :

                                <div className="movies-scroll">
                                    {mediaItems &&
                                        mediaItems.map(
                                            (item, key) =>
                                                <MediaItem
                                                    key={key} isFavorite={favourites[item.Name]}
                                                    movie={item} addToFavourites={addToFavourites}
                                                    removeFromFavourites={removeFromFavourites}
                                                />
                                        )
                                    }
                                </div>

                        }
                    </div>
                </div>
            </div>
    )
};

export default MediaList;
