import { useEffect, useState } from "react";

export function useBrowserStorageState(initialState: string, key: string) {
  const [value, setValue] = useState<string>(function () {
    const storedvalue = localStorage.getItem(key);
    return storedvalue || initialState;
  });

  useEffect(
    function () {
      localStorage.setItem(key, value);
    },
    [value, key]
  );

  return [value, setValue] as const;
}
