import { useEffect, useState, useRef } from "react";
import { City } from "./HomeScreen";

export function useCitySearch(filter: string): City[] | null {
  const trimmedFilter = filter.trim();
  const [cities, setCities] = useState(null);
  const timeout = useRef<number>();
  useEffect(() => {
    if (filter.length < 3) {
      return;
    }
    clearTimeout(timeout.current as number);
    timeout.current = setTimeout(() => {
      fetch(`https://aven.io/api/cities?name=${trimmedFilter}`)
        .then((res) => res.json())
        .then((results) => {
          setCities(results.cities);
        })
        .catch((err) => {});
    }, 150);
  }, [trimmedFilter]);

  return cities;
}
