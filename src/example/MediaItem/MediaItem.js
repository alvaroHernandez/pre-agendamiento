import React from "react";
import "./styles.scss";

const renderFavoriteButton = (message, handler) => {
  return (
    <button className={"favourite-button"} onClick={handler}>
      {message}
    </button>
  );
};

const MediaItem = (props) => {
  const { movie, addToFavourites, removeFromFavourites, isFavorite } = props;
  return (
    <div className="movie-item">
      <div className="image-container">
        <img
          alt={`Thumbnail for ${movie.Name}`}
          className="thumbnail"
          src={movie.Image}
        />
        <div className="favourite-button-container">
          {isFavorite
            ? renderFavoriteButton("Remove from favourites", () =>
                removeFromFavourites(movie.Name)
              )
            : renderFavoriteButton("Add to favourites", () =>
                addToFavourites(movie.Name)
              )}
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
