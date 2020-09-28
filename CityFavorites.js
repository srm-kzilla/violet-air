import { useEffect, useState } from "react";

let favorites = [];
const subscriptions = new Set();

function setFavorites(transaction) {
  favorites = transaction(favorites);
  subscriptions.forEach((handle) => {
    handle(favorites);
  });
}

export function useFavorites() {
  const [state, setState] = useState(favorites);
  useEffect(() => {
    function handleUpdate(newFavorites) {
      setState(newFavorites);
    }
    subscriptions.add(handleUpdate);
    return () => {
      subscriptions.delete(handleUpdate);
    };
  }, []);
  return state;
}

export function useCityFavorite(city) {
  const favCities = useFavorites();
  const isSubscribed = !!favCities.find(
    (favCity) => favCity.cityId === city.cityId
  );
  function setIsFavorite(isFavorite) {
    if (isFavorite) {
      setFavorites((favorites) => [...favorites, city]);
    } else {
      setFavorites((favorites) =>
        favorites.filter((c) => c.cityId !== city.cityId)
      );
    }
  }
  return [isSubscribed, setIsFavorite];
}
