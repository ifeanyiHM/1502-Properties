import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useReducer } from "react";

// ASSET
import phoenixLogo from "./assets/phoenixglogo.png";

//PAGE STRUCTURE
import Header from "./Components/Header/Header";
import Main from "./Components/Main/Main";
import Footer from "./Components/Footer/Footer";

//HEADER STRUCTURE
import PageNav from "./Components/Header/PageNav";
import Logo from "./Components/Header/Logo";
import NavList from "./Components/Header/NavList";
import Wrapper from "./Components/Header/Wrapper";
import Slider from "./Components/Header/Slider";
import HeaderTextDescription from "./Components/Header/HeaderTextDescription";

// MAIN STRUCTURE
import SearchProperties from "./Components/Main/SearchProperties";
import OurServices from "./Components/Main/OurServices";
import FeaturedProperties from "./Components/Main/FeaturedProperties";

//ROUTER PAGES
import About from "./Pages/About";
import Service from "./Pages/Service";
import Contact from "./Pages/Contact";
import PageNotFound from "./Pages/PageNotFound";

//SERVICE PAGE
import ExpandPropertyDetails from "./Pages/ExpandPropertyDetails";
import ServicePage from "./Pages/servicePage";
import { useBrowserStorageState } from "./Hooks/useBrowserStorageState";

//DATA
import {
  propertyData,
  propertySummaryProps,
  servicePageDet,
} from "./Data/propertyData";
import { PrevTopPage, ScrollToTop } from "./Utilities/ScrollToTop";
import Properties from "./Pages/Properties";

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

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { menu, query, randomProperties } = state;

  const [summaryDetails, setSummaryDetails] =
    useBrowserStorageState<propertySummaryProps | null>(null, "summaryDetails");

  const [propertyType, setPropertyType] = useBrowserStorageState<string>(
    "buy",
    "propertyType"
  );

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
    item.location.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <BrowserRouter>
        <PrevTopPage />
        <PageNav>
          <Logo pLogo={phoenixLogo} menu={menu} dispatch={dispatch} />
          <NavList
            menu={menu}
            servicePageDet={servicePageDet}
            setPropertyType={setPropertyType}
          />
        </PageNav>
        <Routes>
          <Route
            index
            element={
              <>
                {/* HEADER */}
                <Header>
                  <Wrapper>
                    <Slider />
                    <HeaderTextDescription />
                  </Wrapper>
                </Header>

                {/* MAIN */}
                <Main>
                  <SearchProperties
                    query={query}
                    dispatch={dispatch}
                    propertyType={propertyType}
                    setPropertyType={setPropertyType}
                  />
                  <OurServices
                    setPropertyType={setPropertyType}
                    servicePageDet={servicePageDet}
                  />
                  <FeaturedProperties
                    randomProperties={randomProperties}
                    setSummaryDetails={setSummaryDetails}
                  />
                </Main>
              </>
            }
          />
          {/* ROUTER PAGES */}
          <Route path="ourservices" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="ukproperties" element={<Properties />} />
          <Route path="*" element={<PageNotFound />} />

          <Route
            path="expandPropertyDetails"
            element={
              <ExpandPropertyDetails
                summaryDetails={summaryDetails}
                propertyType={propertyType}
                key={summaryDetails?.title}
              />
            }
          />

          {/* SERVICE PAGE */}
          <Route path="service" element={<Service />}>
            <Route
              path={propertyType}
              element={
                <ServicePage
                  query={query}
                  dispatch={dispatch}
                  // propertyType={propertyType}
                  setSummaryDetails={setSummaryDetails}
                  searchedLocations={searchedLocations}
                />
              }
            />
          </Route>
        </Routes>

        {/* FOOTER */}
        <Footer />
        <ScrollToTop />
      </BrowserRouter>
    </>
  );
}

export default App;
