import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from "react";
import {
  // propertyData,
  propertySummaryProps,
  slides,
} from "../Data/propertyData";
import {
  defaultPropertyProps,
  PropertyContextProps,
} from "../Data/PropertyProps";
import { useBrowserStorageState } from "../Hooks/useBrowserStorageState";
import { getProperties } from "../services/apiProperties";

export interface PropertyDataProps {
  type: string;
  information: propertySummaryProps[];
}

// const getRandomItem = (array: propertySummaryProps[]): propertySummaryProps =>
//   array[Math.floor(Math.random() * array.length)];

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
  const [propertyData, setPropertyData] = useState<propertySummaryProps[]>([]);
  const [loadingProperties, setLoadingProperties] = useState<boolean>(false);
  const [curIndex, setCurIndex] = useState<number>(0);
  const [selectedType, setSelectedType] = useBrowserStorageState<string>(
    "",
    "selectedType"
  );

  const [propertyType, setPropertyType] = useBrowserStorageState<string>(
    "sale",
    "propertyType"
  );
  const [isPageHeaderShown, setIsPageHeaderShown] =
    useBrowserStorageState<boolean>(false, "isPageHeaderShown");

  const fetchProperties = async () => {
    setLoadingProperties(true);
    try {
      const data = await getProperties();
      setPropertyData(data);
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoadingProperties(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const getRandomItem = (data: propertySummaryProps[]) => {
    const types = [...new Set(data.map((item) => item.type))] // unique types
      .sort(() => 0.5 - Math.random()) // shuffle
      .slice(0, 3); // pick 3 types

    return types.map((type) => {
      const sameTypeItems = data.filter((item) => item.type === type);
      return sameTypeItems[Math.floor(Math.random() * sameTypeItems.length)];
    });
  };

  useEffect(() => {
    const selected = getRandomItem(propertyData);
    dispatch({ type: "selectProperties", payload: selected });
  }, [propertyData]);

  useEffect(function () {
    const mq = window.matchMedia("(min-width: 992px)");
    if (mq.matches) {
      dispatch({ type: "mobileView", payload: true });
    }
  }, []);

  const selectedProperty = propertyData.filter(
    (data) => data.type === propertyType
  );
  if (!selectedProperty) return;

  const searchedLocations = selectedProperty.filter((item) =>
    `${item.title} ${item.location} ${item.code}`
      .toLowerCase()
      .includes(query.toLowerCase())
  );
  return (
    <PropertyContext.Provider
      value={{
        dispatch,
        menu,
        query,
        randomProperties,
        activeCrumb,
        propertyData,
        propertyType,
        setPropertyType,
        isPageHeaderShown,
        setIsPageHeaderShown,
        searchedLocations,
        selectedType,
        setSelectedType,
        curIndex,
        setCurIndex,
        loadingProperties,
        fetchProperties,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
}

export { PropertyContext, PropertyProvider };
