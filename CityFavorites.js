import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-community/async-storage";

let favorites = null;
const subscriptions = new Set();

const FAVS_STORAGE_KEY = "FavoriteCities-0";

AsyncStorage.getItem(FAVS_STORAGE_KEY)
  .then((data) => {
    if (data === null) {
      favorites = [];
      subscriptions.forEach((handle) => {
        handle(favorites);
      });
    } else {
      const storedFavorites = JSON.parse(data);
      favorites = storedFavorites;
      subscriptions.forEach((handle) => {
        handle(favorites);
      });
    }
  })
  .catch((err) => {
    console.error("Could not load favorites", err);
  });

function setFavorites(transaction) {
  favorites = transaction(favorites);
  subscriptions.forEach((handle) => {
    handle(favorites);
  });
  AsyncStorage.setItem(FAVS_STORAGE_KEY, JSON.stringify(favorites)).catch(
    (err) => {
      console.error("Could not write favorites", err);
    }
  );
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
  const isSubscribed =
    !!favCities &&
    !!favCities.find((favCity) => favCity.cityId === city.cityId);
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
