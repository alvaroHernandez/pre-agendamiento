/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import './styles.scss';
import MediaItem from '../MediaItem/MediaItem';
import Loader from '../Loader/Loader';
import useFavourites from './hooks/useFavourites';
import useFetch from './hooks/useFetch';

const MediaList = (props) => {
  const [addToFavourites, removeFromFavourites, isFavourite] = useFavourites();
  // eslint-disable-next-line react/prop-types
  // eslint-disable-next-line react/destructuring-assignment
  const [isLoading, mediaItems] = useFetch(props.api);

  const renderLoading = () => (
    <div className="loader-container">
      <Loader />
    </div>
  );

  const renderMediaList = () => (
    <div className="movies-scroll">
      <ul>
        {mediaItems
            && mediaItems.map((item) => (
              <li key={item.Name}>
                <MediaItem
                  isFavorite={isFavourite(item.Name)}
                  movie={item}
                  addToFavourites={addToFavourites}
                  removeFromFavourites={removeFromFavourites}
                />
              </li>
            ))}
      </ul>
    </div>
  );

  // eslint-disable-next-line react/prop-types
  const { title } = props;

  return (
    <div className="container">
      <div className="box">
        <div className="title">
          <h1>{title}</h1>
        </div>
        <div className="content">
          {isLoading ? renderLoading() : renderMediaList()}
        </div>
      </div>
    </div>
  );
};

export default MediaList;
