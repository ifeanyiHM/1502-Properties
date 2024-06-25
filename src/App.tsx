import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

// ASSET
import phoenixLogo from "./assets/icon-deal.png";
import featured1 from "./assets/feature1.webp";
import featured2 from "./assets/feature2.webp";
import featured3 from "./assets/feature3.webp";

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
import Buy from "./Pages/Service-Page/Buy";
import Rent from "./Pages/Service-Page/Rent";
import Shortlet from "./Pages/Service-Page/Shortlet";
import LongLease from "./Pages/Service-Page/LongLease";
import JointVentures from "./Pages/Service-Page/JointVentures";
import ExpandPropertyDetails from "./Pages/ExpandPropertyDetails";

const propertyData = [
  {
    type: "buy",
    information: [
      {
        src: [featured1, featured2, featured3],
        title: "luxury 4 bedroom detached duplex with bq",
        price: "₦ 150,000,000",
        location: "ajah Lagos",
      },
      {
        src: [featured2, featured3, featured1],
        title: "6 bedroom detached bungalow",
        price: "₦ 10,000,000",
        location: "surulere Lagos",
      },
      {
        src: [featured3, featured1, featured2],
        title: "7 bedroom detached duplex with bq",
        price: "₦ 90,000,000",
        location: "shomolu surulere",
      },
      {
        src: [featured1, featured2, featured3],
        title: "luxury 4 bedroom semi-duplex",
        price: "₦ 500,000",
        location: "ebute meta",
      },
      {
        src: [featured2, featured1, featured3],
        title: "luxury 5 bedroom detached duplex with bq",
        price: "₦ 180,000,000",
        location: "coker",
      },
      {
        src: [featured3, featured2, featured2],
        title: "luxury 4 bedroom detached duplex with bq",
        price: "₦ 160,000,000",
        location: "orile iganmu",
      },
      {
        src: [featured1, featured2, featured3],
        title: " 4 bedroom detached duplex with bq",
        price: "₦ 120,000,000",
        location: "maryland ikeja",
      },
      {
        src: [featured2, featured3, featured1],
        title: "luxury 2 bedroom detached duplex",
        price: "₦ 120,560,000",
        location: "Ajah Lagos",
      },
      {
        src: [featured3, featured1, featured2],
        title: "luxury 8 bedroom detached bungalow with bq",
        price: "₦ 14,009,000",
        location: "Anthony shomolu",
      },
      {
        src: [featured1, featured2, featured3],
        title: "luxury 3 bedroom detached duplex with bq",
        price: "₦ 850,000,000",
        location: "lekki phase 1",
      },
    ],
  },
  {
    type: "rent",
    information: [
      {
        src: [featured1, featured2, featured3],
        title: "luxury 4 bedroom detached duplex with bq",
        price: "₦ 150,000,000",
        location: "ajah Lagos",
      },
      {
        src: [featured2, featured3, featured1],
        title: "6 bedroom detached bungalow",
        price: "₦ 10,000,000",
        location: "surulere Lagos",
      },
      {
        src: [featured3, featured1, featured2],
        title: "7 bedroom detached duplex with bq",
        price: "₦ 90,000,000",
        location: "alaka surulere",
      },
      {
        src: [featured1, featured2, featured3],
        title: "luxury 4 bedroom semi-duplex",
        price: "₦ 500,000",
        location: "epe ibeju lekki",
      },
      {
        src: [featured2, featured1, featured3],
        title: "luxury 5 bedroom detached duplex with bq",
        price: "₦ 180,000,000",
        location: "coker orile",
      },
      {
        src: [featured3, featured2, featured2],
        title: "luxury 4 bedroom detached duplex with bq",
        price: "₦ 160,000,000",
        location: "orile iganmu",
      },
      {
        src: [featured1, featured2, featured3],
        title: " 4 bedroom detached duplex with bq",
        price: "₦ 120,000,000",
        location: "maryland ikeja",
      },
      {
        src: [featured2, featured3, featured1],
        title: "luxury 2 bedroom detached duplex",
        price: "₦ 120,560,000",
        location: "Ajah Lagos",
      },
      {
        src: [featured3, featured1, featured2],
        title: "luxury 8 bedroom detached bungalow with bq",
        price: "₦ 14,009,000",
        location: "Anthony shomolu",
      },
      {
        src: [featured1, featured2, featured3],
        title: "luxury 3 bedroom detached duplex with bq",
        price: "₦ 850,000,000",
        location: "lekki phase 1",
      },
    ],
  },
  {
    type: "shortlet",
    information: [
      {
        src: [featured1, featured2, featured3],
        title: "luxury 4 bedroom detached duplex with bq",
        price: "₦ 150,000,000",
        location: "ajah Lagos",
      },
      {
        src: [featured2, featured3, featured1],
        title: "6 bedroom detached bungalow",
        price: "₦ 10,000,000",
        location: "surulere Lagos",
      },
      {
        src: [featured3, featured1, featured2],
        title: "7 bedroom detached duplex with bq",
        price: "₦ 90,000,000",
        location: "alaka surulere",
      },
      {
        src: [featured1, featured2, featured3],
        title: "luxury 4 bedroom semi-duplex",
        price: "₦ 500,000",
        location: "epe ibeju lekki",
      },
      {
        src: [featured2, featured1, featured3],
        title: "luxury 5 bedroom detached duplex with bq",
        price: "₦ 180,000,000",
        location: "coker orile",
      },
      {
        src: [featured3, featured2, featured2],
        title: "luxury 4 bedroom detached duplex with bq",
        price: "₦ 160,000,000",
        location: "orile iganmu",
      },
      {
        src: [featured1, featured2, featured3],
        title: " 4 bedroom detached duplex with bq",
        price: "₦ 120,000,000",
        location: "maryland ikeja",
      },
      {
        src: [featured2, featured3, featured1],
        title: "luxury 2 bedroom detached duplex",
        price: "₦ 120,560,000",
        location: "Ajah Lagos",
      },
      {
        src: [featured3, featured1, featured2],
        title: "luxury 8 bedroom detached bungalow with bq",
        price: "₦ 14,009,000",
        location: "Anthony shomolu",
      },
      {
        src: [featured1, featured2, featured3],
        title: "luxury 3 bedroom detached duplex with bq",
        price: "₦ 850,000,000",
        location: "lekki phase 1",
      },
    ],
  },
];

export interface PropertyDataProps {
  type: string;
  information: propertySummaryProps[];
}

export interface propertySummaryProps {
  src: string[];
  title: string;
  price: string;
  location: string;
}

function App() {
  const [menu, setMenu] = useState<boolean>(false);
  const [propertyType, setPropertyType] = useState<string>("buy");
  const [query, setQuery] = useState<string>("");
  const [summaryDetails, setSummaryDetails] =
    useState<propertySummaryProps | null>(null);

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
                  <OurServices />
                  <FeaturedProperties setSummaryDetails={setSummaryDetails} />
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
            element={<ExpandPropertyDetails summaryDetails={summaryDetails} />}
          />

          {/* SERVICE PAGE */}
          <Route path="service" element={<Service />}>
            <Route
              index
              element={
                <Buy
                  query={query}
                  setQuery={setQuery}
                  setSummaryDetails={setSummaryDetails}
                  searchedLocations={searchedLocations}
                />
              }
            />
            <Route
              path="buy"
              element={
                <Buy
                  query={query}
                  setQuery={setQuery}
                  setSummaryDetails={setSummaryDetails}
                  searchedLocations={searchedLocations}
                />
              }
            />
            <Route
              path="rent"
              element={
                <Rent
                  query={query}
                  setQuery={setQuery}
                  setSummaryDetails={setSummaryDetails}
                  searchedLocations={searchedLocations}
                />
              }
            />
            <Route
              path="shortlet"
              element={
                <Shortlet
                  query={query}
                  setQuery={setQuery}
                  setSummaryDetails={setSummaryDetails}
                  searchedLocations={searchedLocations}
                />
              }
            />
            <Route path="long-lease" element={<LongLease />} />
            <Route path="joint-ventures" element={<JointVentures />} />
          </Route>
        </Routes>

        {/* FOOTER */}
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
