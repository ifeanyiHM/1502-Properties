import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from "react";
import {
  propertyData,
  propertySummaryProps,
  slides,
} from "../Data/propertyData";
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
  activeCrumb: string;
  randomProperties: propertySummaryProps[];
}

export interface AppActionProps {
  type: string;
  payload?: boolean | string | propertySummaryProps[];
}

const initialState = {
  menu: false,
  activeCrumb: "",
  query: "",
  randomProperties: [],
};

function reducer(state: AppStateProps, action: AppActionProps): AppStateProps {
  switch (action.type) {
    case "mobileView":
      return { ...state, menu: action.payload as boolean };
    case "toggleMobileView":
      return { ...state, menu: !state.menu };
    case "activeProperty":
      return { ...state, activeCrumb: action.payload as string };
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
  //USE REDUCER
  const [state, dispatch] = useReducer(reducer, initialState);
  const { menu, activeCrumb, query, randomProperties } = state;

  //STATE
  const [curIndex, setCurIndex] = useState<number>(0);
  const [selectedType, setSelectedType] = useBrowserStorageState<string>(
    "",
    "selectedType"
  );
  const [summaryDetails, setSummaryDetails] =
    useBrowserStorageState<propertySummaryProps | null>(null, "summaryDetails");
  const [propertyType, setPropertyType] = useBrowserStorageState<string>(
    "sale",
    "propertyType"
  );
  const [isPageHeaderShown, setIsPageHeaderShown] =
    useBrowserStorageState<boolean>(false, "isPageHeaderShown");

  //EFFECTS
  useEffect(() => {
    const interval = setInterval(() => {
      setCurIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

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
        summaryDetails,
        setSummaryDetails,
        propertyType,
        setPropertyType,
        isPageHeaderShown,
        setIsPageHeaderShown,
        searchedLocations,
        selectedType,
        setSelectedType,
        curIndex,
        setCurIndex,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
}

export { PropertyContext, PropertyProvider };
