import { useEffect, useState } from "react";

export function useCitySearch(filter) {
  const trimmedFilter = filter.trim();
  const [cities, setCities] = useState(null);
  useEffect(() => {
    if (filter.length < 3) {
      return;
    }
    fetch(`https://aven.io/api/cities?name=${trimmedFilter}`)
      .then((res) => res.json())
      .then((results) => {
        setCities(results.cities);
      })
      .catch((err) => {});
  }, [trimmedFilter]);

  return cities;
}
