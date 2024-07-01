// import { useEffect, useState } from "react";

// export function useBrowserStorageState<T>(initialState: T, key: string) {
//   const [value, setValue] = useState<T>(function () {
//     const storedvalue = localStorage.getItem(key);
//     return storedvalue ? JSON.parse(storedvalue) : initialState;
//   });

//   useEffect(
//     function () {
//       localStorage.setItem(key, JSON.stringify(value));
//     },
//     [value, key]
//   );

//   return [value, setValue] as const;
// }

import { useEffect, useState } from "react";

export function useBrowserStorageState<T>(initialState: T, key: string) {
  const [value, setValue] = useState<T>(() => {
    try {
      const storedValue = localStorage.getItem(key);
      console.log(`Initial load: ${key} =`, storedValue);
      return storedValue ? JSON.parse(storedValue) : initialState;
    } catch (error) {
      console.error(`Error loading ${key} from localStorage`, error);
      return initialState;
    }
  });

  useEffect(() => {
    try {
      console.log(`Saving: ${key} =`, value);
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error saving ${key} to localStorage`, error);
    }
  }, [value, key]);

  return [value, setValue] as const;
}
