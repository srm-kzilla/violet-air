import { useEffect, useState } from "react";

const favorites = [];
const subscriptions = new Set();

function notifyFavoriteChange() {
  subscriptions.forEach((handle) => handle(favorites));
}

export function useCityFavorite(city) {
  const initiallyIsFavorited = !!favorites.find(
    (c) => c.cityId === city.cityId
  );
  const [isSubscribed, internalIsFavorite] = useState(initiallyIsFavorited);
  useEffect(() => {
    function handleFavoriteUpdate(newFavs) {
      const isSubscribedNow = !!newFavs.find((c) => c.cityId === city.cityId);
      if (isSubscribed !== isSubscribedNow) {
        internalIsFavorite(isSubscribedNow);
      }
    }
    subscriptions.add(handleFavoriteUpdate);
    return () => {
      subscriptions.delete(handleFavoriteUpdate);
    };
  }, [city.cityId]);
  function setIsFavorite(isSubscribed) {
    if (isSubscribed) {
      const cityId = city.cityId;
      const fav = favorites.find((c) => c.cityId === cityId);
      if (!fav) {
        favorites.push(city);
        notifyFavoriteChange();
      }
    } else {
      // remove city
      const removalIndex = favorites.findIndex((c) => c.cityId === city.cityId);
      if (removalIndex !== -1) {
        favorites.splice(removalIndex, 1);
        notifyFavoriteChange();
      }
    }
  }

  return [isSubscribed, setIsFavorite];
}

export function useFavorites() {
  const [internalFavorites, setInternalFavorites] = useState(favorites);
  useEffect(() => {
    function handleUpdate(newFavs) {
      setInternalFavorites(newFavs);
    }
    subscriptions.add(handleUpdate);
    return () => {
      subscriptions.delete(handleUpdate);
    };
  }, []);
  return internalFavorites;
}
