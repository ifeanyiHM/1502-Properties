import {
  ReactNode,
  createContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { propertyData, propertySummaryProps } from "../Data/propertyData";
import {
  defaultPropertyProps,
  PropertyContextProps,
} from "../Data/PropertyProps";
import { useBrowserStorageState } from "../Hooks/useBrowserStorageState";

export interface PropertyDataProps {
  type: string;
  information: propertySummaryProps[];
}

const getRandomItem = (array: propertySummaryProps[]): propertySummaryProps =>
  array[Math.floor(Math.random() * array.length)];

interface AppStateProps {
  menu: boolean;
  query: string;
  randomProperties: propertySummaryProps[];
}

export interface AppActionProps {
  type: string;
  payload?: boolean | string | propertySummaryProps[];
}

const initialState = { menu: false, query: "", randomProperties: [] };

function reducer(state: AppStateProps, action: AppActionProps): AppStateProps {
  switch (action.type) {
    case "mobileView":
      return { ...state, menu: action.payload as boolean };
    case "toggleMobileView":
      return { ...state, menu: !state.menu };
    case "searchProperties":
      return { ...state, query: action.payload as string };
    case "selectProperties":
      return { ...state, randomProperties: action.payload as [] };
    default:
      throw new Error("data not found");
  }
}

interface PropertyProviderProps {
  children: ReactNode;
}

const PropertyContext =
  createContext<PropertyContextProps>(defaultPropertyProps);

function PropertyProvider({ children }: PropertyProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { menu, query, randomProperties } = state;

  const [activeCrumb, setActiveCrumb] = useState<string>("");

  const [summaryDetails, setSummaryDetails] =
    useBrowserStorageState<propertySummaryProps | null>(null, "summaryDetails");

  const [propertyType, setPropertyType] = useBrowserStorageState<string>(
    "buy",
    "propertyType"
  );

  const [isPageHeaderShown, setIsPageHeaderShown] =
    useBrowserStorageState<boolean>(false, "isPageHeaderShown");

  useEffect(() => {
    const selectedProperties = propertyData.map((propertyType) =>
      getRandomItem(propertyType.information)
    );
    dispatch({ type: "selectProperties", payload: selectedProperties });
  }, []);

  useEffect(function () {
    const mq = window.matchMedia("(min-width: 992px)");
    if (mq.matches) {
      dispatch({ type: "mobileView", payload: true });
    }
  }, []);

  const selectedProperty = propertyData.find(
    (data) => data.type === propertyType
  );
  if (!selectedProperty) return;

  const searchedLocations = selectedProperty.information.filter((item) =>
    `${item.title} ${item.location}`.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <PropertyContext.Provider
      value={{
        dispatch,
        menu,
        query,
        randomProperties,
        activeCrumb,
        setActiveCrumb,
        summaryDetails,
        setSummaryDetails,
        propertyType,
        setPropertyType,
        isPageHeaderShown,
        setIsPageHeaderShown,
        searchedLocations,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
}

export { PropertyProvider, PropertyContext };
