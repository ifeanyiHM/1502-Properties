import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

// ASSET
import phoenixLogo from "./assets/icon-deal.png";
// import featured1 from "../../assets/feature1.webp";
// import featured2 from "../../assets/feature2.webp";
// import featured3 from "../../assets/feature3.webp";

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
import MoreFeaturedProperties from "./Pages/MoreFeaturedProperties";

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
    locations: [
      "ajah",
      "surulere",
      "alaka",
      "epe",
      "coker",
      "orile",
      "maryland",
      "anthony",
      "ikorodu",
      "ikoyi",
      "ikeja",
      "kisofe",
      "lekki",
    ],
  },
  {
    type: "rent",
    locations: [
      "ajah",
      "surulere",
      "alaka",
      "epe",
      "coker",
      "orile",
      "maryland",
      "anthony",
      "ikorodu",
      "ikoyi",
      "ikeja",
      "kisofe",
      "lekki",
    ],
  },
  {
    type: "shortlet",
    locations: [
      "ajah",
      "surulere",
      "alaka",
      "epe",
      "coker",
      "orile",
      "maryland",
      "anthony",
      "ikorodu",
      "ikoyi",
      "ikeja",
      "kisofe",
      "lekki",
    ],
  },
];

export interface PropertyDataProps {
  type: string;
  locations: string[];
}

console.log(propertyData[0].type);
console.log(propertyData[0]);

export interface propertySummaryProps {
  src: string[];
  title: string;
  price: string;
  location: string;
}
function App() {
  const [menu, setMenu] = useState<boolean>(false);
  const [summaryDetails, setSummaryDetails] =
    useState<propertySummaryProps | null>(null);
  const [propertyType, setPropertyType] = useState<string>("buy");

  const selectedProperty = propertyData.find(
    (data) => data.type === propertyType
  ) || { type: "", locations: [] };

  useEffect(function () {
    const mq = window.matchMedia("(min-width: 992px)");
    if (mq.matches) {
      setMenu(true);
    }
  }, []);

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
                    onSelectProperty={selectedProperty}
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
            path="featuredProperties"
            element={<MoreFeaturedProperties />}
          />
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
                  onSelectProperty={selectedProperty}
                  // onSetPropertyType={setPropertyType}
                />
              }
            />
            <Route
              path="buy"
              element={
                <Buy
                  onSelectProperty={selectedProperty}
                  // onSetPropertyType={setPropertyType}
                />
              }
            />
            <Route
              path="rent"
              element={
                <Rent
                  onSelectProperty={selectedProperty}
                  // onSetPropertyType={setPropertyType}
                />
              }
            />
            <Route
              path="shortlet"
              element={<Shortlet shortlet={propertyData[2]} />}
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

import { useState } from "react";
import { PropertyDataProps } from "../../App";

interface BuyProps {
  onSelectProperty: PropertyDataProps;
}

function Buy({ onSelectProperty }: BuyProps) {
  const [query, setQuery] = useState<string>("");

  console.log(onSelectProperty);
  console.log(onSelectProperty.locations);

  const searchQuery =
    query.length > 0
      ? onSelectProperty.locations.filter((item) =>
          item.toLocaleLowerCase().includes(query.toLocaleLowerCase())
        )
      : onSelectProperty.locations;

  return (
    <div className="buy">
      <h1>Buy properties coming soon</h1>

      <input
        type="text"
        placeholder="search properties by area"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <ul>
        {searchQuery.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default Buy;

import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PropertyDataProps } from "../../App";

interface SearchPropertiesProps {
  onSelectProperty: PropertyDataProps;
  propertyType: string;
  setPropertyType: (type: string) => void;
}

function SearchProperties({
  onSelectProperty,
  propertyType,
  setPropertyType,
}: SearchPropertiesProps) {
  const [query, setQuery] = useState<string>("");

  const navigate = useNavigate();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!query) return;

    if (!onSelectProperty) return;

    const searchedLocations = onSelectProperty.locations.filter((item) =>
      item.toLocaleLowerCase().includes(query.toLocaleLowerCase())
    );

    if (searchedLocations.length > 0) {
      navigate(`service/${propertyType}`);
    }
  }

  return (
    <div className="search-properties">
      <h2>Find your next home</h2>
      <div className="target-btn">
        <button onClick={() => setPropertyType("buy")}>Buy</button>
        <button onClick={() => setPropertyType("rent")}>rent</button>
        <button onClick={() => setPropertyType("shortlet")}>shortlet</button>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="find property"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">search</button>
      </form>
    </div>
  );
}

export default SearchProperties;
