import { useEffect, useState } from "react";
import { City, Sensor } from "./HomeScreen";


type CityStore =  {
  subscribe: (handler: Function) => void;
  get: () => CityStats | null;
}

export type CityStats = {
  avgPM2_5: number;
  avgTempF: number;
  avgHumidity: number;
  sensorCount: number;
  population: number;
  lat: number;
  lon: number;
  sensors: Sensor[];
}

function createCityStore(cityId: string) {
  let cityState: CityStats | null = null;
  const subscribers: Set<Function> = new Set();
  function setState(city: CityStats) {
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
    function handleCityState(city: CityStats) {
      setStats(city);
    }
    return store.subscribe(handleCityState);
  }, [store]);
  return stats;
}
