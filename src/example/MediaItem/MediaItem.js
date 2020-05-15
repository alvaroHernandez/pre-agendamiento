import React from 'react';
import './styles.scss';
import PropTypes from 'prop-types';

const MediaItem = (props) => {
  const { movie, addToFavourites, removeFromFavourites, isFavorite } = props;

  const renderFavoriteButton = (message, handler) => (
    <button className='favourite-button' onClick={handler}>
      {message}
    </button>
  );

  return (
    <div className='movie-item'>
      <div className='image-container'>
        <img
          alt={`Thumbnail for ${movie.Name}`}
          className='thumbnail'
          src={movie.Image}
        />
        <div className='favourite-button-container'>
          {isFavorite
            ? renderFavoriteButton('Remove from favourites', () =>
                removeFromFavourites(movie.Name),
              )
            : renderFavoriteButton('Add to favourites', () =>
                addToFavourites(movie.Name),
              )}
        </div>
      </div>
      <div className='information'>
        <span className='title'>{movie.Name}</span>
        <span className='year'>{movie.Year}</span>
        <span className='type'>{movie.Type}</span>
      </div>
    </div>
  );
};

MediaItem.propTypes = {
  movie: PropTypes.object.required,
  addToFavourites: PropTypes.func.required,
  removeFromFavourites: PropTypes.func.required,
  isFavorite: PropTypes.func.required,
};

export default MediaItem;
