import { useEffect, useState } from "react";

function createCityStore(cityId: string) {
  let cityState = null;
  const subscribers = new Set();
  function setState(city) {
    cityState = city;
    subscribers.forEach((handle) => handle(city));
  }
  let loadPromise;
  return {
    subscribe: (handler) => {
      subscribers.add(handler);
      if (cityState === null && !loadPromise) {
        loadPromise = fetch(`https://aven.io/api/purpleair?city=${cityId}`)
          .then((res) => {
            return res.json();
          })
          .then((city) => {
            setState(city);
          })
          .catch((err) => {
            console.error("PurpleAir API request failed");
            console.error(err);
          })
          .finally(() => {
            loadPromise = null;
          });
      }
      return () => {
        subscribers.delete(handler);
      };
    },
    get: () => {
      return cityState;
    },
  };
}

const cityStores = {};

function getCityStore(cityId) {
  if (cityStores[cityId]) return cityStores[cityId];
  cityStores[cityId] = createCityStore(cityId);
  return cityStores[cityId];
}

export function useCity(cityId) {
  if (!cityId) throw new Error("Must provide cityId to useCity");
  const store = getCityStore(cityId);
  const [stats, setStats] = useState(store.get());
  useEffect(() => {
    function handleCityState(city) {
      setStats(city);
    }
    return store.subscribe(handleCityState);
  }, [store]);
  return stats;
}
