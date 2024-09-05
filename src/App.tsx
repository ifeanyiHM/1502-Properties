import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PrevTopPage, ScrollToTop } from "./Utilities/ScrollToTop";
import Properties from "./Pages/Properties";
import { PropertyProvider } from "./context/PropertyContext";
import useProperty from "./context/useProperty";

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

function App() {
  return (
    <>
      <PropertyProvider>
        <BrowserRouter>
          <PrevTopPage />
          <PageNav>
            <Logo />
            <NavList />
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
                    <SearchProperties />
                    <OurServices />
                    <FeaturedProperties />
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
              element={<ExpandPropertyRoutes />}
            />

            {/* SERVICE PAGE */}
            <Route path="service" element={<Service />}>
              <Route path=":propertyType" element={<ServicePageRoutes />} />
            </Route>
          </Routes>

          {/* FOOTER */}
          <Footer />
          <ScrollToTop />
        </BrowserRouter>
      </PropertyProvider>
    </>
  );
}

function ExpandPropertyRoutes() {
  const { summaryDetails } = useProperty();
  return <ExpandPropertyDetails key={summaryDetails?.title} />;
}

function ServicePageRoutes() {
  const { propertyType } = useProperty();
  return <ServicePage key={propertyType} />;
}

export default App;
