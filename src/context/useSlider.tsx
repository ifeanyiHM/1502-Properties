import { useContext } from "react";
import { SliderContext } from "./SliderContext";

function useSlider() {
  const context = useContext(SliderContext);
  if (!context) {
    throw new Error("useSlider must be used within a SliderProvider");
  }
  return context;
}

export default useSlider;
