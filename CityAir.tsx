import { useEffect, useState } from "react";
import { City } from "./HomeScreen";


type CityStore =  {
  subscribe: (handler: Function) => void;
  get: () => City | null;
}

function createCityStore(cityId: string) {
  let cityState: City | null = null;
  const subscribers: Set<Function> = new Set();
  function setState(city: City) {
    cityState = city;
    subscribers.forEach((handle) => handle(city));
  }
  let loadPromise: Promise<void> | null;
  return {
    subscribe: (handler: Function) => {
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

const cityStores:{
  [key: string]: CityStore;
} = {};

function getCityStore(cityId: string) {
  if (cityStores[cityId]) return cityStores[cityId];
  cityStores[cityId] = createCityStore(cityId);
  return cityStores[cityId];
}

export function useCity(cityId: string) {
  if (!cityId) throw new Error("Must provide cityId to useCity");
  const store = getCityStore(cityId);
  const [stats, setStats] = useState(store.get());
  useEffect(() => {
    function handleCityState(city: City) {
      setStats(city);
    }
    return store.subscribe(handleCityState);
  }, [store]);
  return stats;
}
