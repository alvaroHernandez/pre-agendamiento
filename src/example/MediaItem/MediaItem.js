/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import './styles.scss';

const renderFavoriteButton = (message, handler) => (
  // eslint-disable-next-line react/button-has-type
  <button className="favourite-button" onClick={handler}>
    {message}
  </button>
);

const MediaItem = (props) => {
  const {
    // eslint-disable-next-line react/prop-types
    movie, addToFavourites, removeFromFavourites, isFavorite,
  } = props;
  return (
    <div className="movie-item">
      <div className="image-container">
        <img
          // eslint-disable-next-line react/prop-types
          alt={`Thumbnail for ${movie.Name}`}
          className="thumbnail"
          // eslint-disable-next-line react/prop-types
          src={movie.Image}
        />
        <div className="favourite-button-container">
          {isFavorite
            // eslint-disable-next-line react/prop-types
            ? renderFavoriteButton('Remove from favourites', () => removeFromFavourites(movie.Name))
            // eslint-disable-next-line react/prop-types
            : renderFavoriteButton('Add to favourites', () => addToFavourites(movie.Name))}
        </div>
      </div>
      <div className="information">
        <span className="title">{movie.Name}</span>
        <span className="year">{movie.Year}</span>
        <span className="type">{movie.Type}</span>
      </div>
    </div>
  );
};

export default MediaItem;
