import { useEffect, useState, useRef } from "react";

export function useCitySearch(filter) {
  const trimmedFilter = filter.trim();
  const [cities, setCities] = useState(null);
  const timeout = useRef(null);
  useEffect(() => {
    if (filter.length < 3) {
      return;
    }
    clearTimeout(timeout.current);
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
