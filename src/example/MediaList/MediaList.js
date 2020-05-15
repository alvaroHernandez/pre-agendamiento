import React from 'react';
import './styles.scss';
import MediaItem from '../MediaItem/MediaItem';
import Loader from '../Loader/Loader';
import useFavourites from './hooks/useFavourites';
import useFetch from './hooks/useFetch';
import PropTypes from 'prop-types';

const MediaList = (props) => {
  const [addToFavourites, removeFromFavourites, isFavourite] = useFavourites();
  const [isLoading, mediaItems] = useFetch(props.api);

  const renderLoading = () => (
    <div className='loader-container'>
      <Loader />
    </div>
  );

  const renderMediaList = () => (
    <div className='movies-scroll'>
      <ul>
        {mediaItems &&
          mediaItems.map((item) => (
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

  const { title } = props;

  return (
    <div className='container'>
      <div className='box'>
        <div className='title'>
          <h1>{title}</h1>
        </div>
        <div className='content'>
          {isLoading ? renderLoading() : renderMediaList()}
        </div>
      </div>
    </div>
  );
};

MediaList.propTypes = {
  title: PropTypes.string.required,
  api: PropTypes.string.required,
};

export default MediaList;
