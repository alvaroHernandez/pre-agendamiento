import { useState } from 'react';

const useFavourites = () => {
  const [favourites, setFavourites] = useState({});

  const addToFavourites = (itemName) => {
    setFavourites({ ...favourites, [itemName]: true });
  };

  const removeFromFavourites = (itemName) => {
    setFavourites({ ...favourites, [itemName]: false });
  };

  const isFavourite = (itemName) =>
    favourites[itemName] !== undefined && favourites[itemName] === true;

  return [addToFavourites, removeFromFavourites, isFavourite];
};

export default useFavourites;
