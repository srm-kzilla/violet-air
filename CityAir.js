import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-community/async-storage";

const cityStores = {};

function createCityStore(cityId) {
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

function getCityStats(city) {
  if (!city) return null;
  const {
    avgTempF,
    avgPM2_5,
    avgHumidity,
    avgPressure,
    sensorCount,
    loc,
    name,
    population,
  } = city;
  return {
    avgTempF,
    avgPM2_5,
    avgHumidity,
    avgPressure,
    sensorCount,
    lat: loc.coordinates[1],
    lon: loc.coordinates[0],
    name,
    population,
  };
}

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

export function useCityStats(cityId) {
  if (!cityId) throw new Error("Must provide cityId to useCityStats");
  const store = getCityStore(cityId);
  const [stats, setStats] = useState(getCityStats(store.get()));
  useEffect(() => {
    function handleCityState(city) {
      setStats(getCityStats(city));
    }
    return store.subscribe(handleCityState);
  }, [store]);
  return stats;
}
