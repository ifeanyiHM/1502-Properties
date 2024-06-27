import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

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
import propertyData from "./Data/propertyData";

export interface PropertyDataProps {
  type: string;
  information: propertySummaryProps[];
}

export interface propertySummaryProps {
  src: string[];
  title: string;
  price: string;
  location: string;
  size?: string;
  measurement?: string;
  suitability?: string[];
}

const getRandomItem = (array: propertySummaryProps[]): propertySummaryProps =>
  array[Math.floor(Math.random() * array.length)];

function App() {
  const [menu, setMenu] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");

  const [summaryDetails, setSummaryDetails] =
    useState<propertySummaryProps | null>(null);

  const [randomProperties, setRandomProperties] = useState<
    propertySummaryProps[]
  >([]);

  const [propertyType, setPropertyType] = useBrowserStorageState(
    "buy",
    "propertyType"
  );

  useEffect(() => {
    const selectedProperties = propertyData.map((propertyType) =>
      getRandomItem(propertyType.information)
    );
    setRandomProperties(selectedProperties);
  }, []);

  useEffect(function () {
    const mq = window.matchMedia("(min-width: 992px)");
    if (mq.matches) {
      setMenu(true);
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
        <Routes>
          <Route
            index
            element={
              <>
                {/* HEADER */}
                <Header>
                  <PageNav>
                    <Logo pLogo={phoenixLogo} menu={menu} setMenu={setMenu} />
                    <NavList menu={menu} />
                  </PageNav>

                  <Wrapper>
                    <Slider />
                    <HeaderTextDescription />
                  </Wrapper>
                </Header>

                {/* MAIN */}
                <Main>
                  <SearchProperties
                    query={query}
                    setQuery={setQuery}
                    propertyType={propertyType}
                    setPropertyType={setPropertyType}
                  />
                  <OurServices setPropertyType={setPropertyType} />
                  <FeaturedProperties
                    randomProperties={randomProperties}
                    setSummaryDetails={setSummaryDetails}
                  />
                </Main>
              </>
            }
          />
          {/* ROUTER PAGES */}
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<PageNotFound />} />

          <Route
            path="expandPropertyDetails"
            element={
              <ExpandPropertyDetails
                summaryDetails={summaryDetails}
                propertyType={propertyType}
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
                  setQuery={setQuery}
                  propertyType={propertyType}
                  setSummaryDetails={setSummaryDetails}
                  searchedLocations={searchedLocations}
                />
              }
            />
          </Route>
        </Routes>

        {/* FOOTER */}
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
