import { propertySummaryProps } from "./propertyData";

export interface SliderContextProps {
  curIndex: number;
  setCurIndex: (type: number) => void;
  topProperty: propertySummaryProps[];
}

export const defaultSliderProps: SliderContextProps = {
  curIndex: 0,
  setCurIndex: () => {},
  topProperty: [],
};
