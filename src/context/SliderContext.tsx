import { createContext, ReactNode, useEffect, useState } from "react";

import useProperty from "./useProperty";
import { defaultSliderProps, SliderContextProps } from "../Data/SliderProps";

interface SliderProviderProps {
  children: ReactNode;
}

const SliderContext = createContext<SliderContextProps>(defaultSliderProps);

function SliderProvider({ children }: SliderProviderProps) {
  const { propertyData } = useProperty();

  const [curIndex, setCurIndex] = useState<number>(0);

  const topProperty = propertyData.filter((property) =>
    [62, 10, 64].includes(+property.id)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurIndex((prevIndex) => (prevIndex + 1) % topProperty.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [topProperty.length]);

  return (
    <SliderContext.Provider
      value={{
        curIndex,
        setCurIndex,
        topProperty,
      }}
    >
      {children}
    </SliderContext.Provider>
  );
}

export { SliderContext, SliderProvider };
