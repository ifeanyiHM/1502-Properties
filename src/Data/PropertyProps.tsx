import { AppActionProps } from "../context/PropertyContext";
import { propertySummaryProps } from "./propertyData";

export interface PropertyContextProps {
  dispatch: React.Dispatch<AppActionProps>;
  menu: boolean;
  query: string;
  randomProperties: propertySummaryProps[];
  activeCrumb: string;
  summaryDetails: propertySummaryProps | null;
  setSummaryDetails: (summary: propertySummaryProps | null) => void;
  propertyType: string;
  setPropertyType: (type: string) => void;
  isPageHeaderShown: boolean;
  setIsPageHeaderShown: (shown: boolean) => void;
  searchedLocations: propertySummaryProps[];
}

export const defaultPropertyProps: PropertyContextProps = {
  dispatch: () => {},
  menu: false,
  query: "",
  randomProperties: [],
  activeCrumb: "",
  summaryDetails: null,
  setSummaryDetails: () => {},
  propertyType: "",
  setPropertyType: () => {},
  isPageHeaderShown: false,
  setIsPageHeaderShown: () => {},
  searchedLocations: [],
};
