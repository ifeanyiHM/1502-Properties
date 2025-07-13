import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PropertyProvider } from "./context/PropertyContext";
import useProperty from "./context/useProperty";
import Properties from "./Pages/Properties";
// import PageViewTracker from "./PageViewTracker";
import { PrevTopPage, ScrollToTop } from "./Utilities/ScrollToTop";

//PAGE STRUCTURE
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import Main from "./Components/Main/Main";

//HEADER STRUCTURE
import HeaderTextDescription from "./Components/Header/HeaderTextDescription";
import Logo from "./Components/Header/Logo";
import NavList from "./Components/Header/NavList";
import PageNav from "./Components/Header/PageNav";
import Slider from "./Components/Header/Slider";
import Wrapper from "./Components/Header/Wrapper";

// MAIN STRUCTURE
import FeaturedProperties from "./Components/Main/FeaturedProperties";
import OurServices from "./Components/Main/OurServices";
import SearchProperties from "./Components/Main/SearchProperties";

//ROUTER PAGES
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import PageNotFound from "./Pages/PageNotFound";
import Service from "./Pages/Service";

//SERVICE PAGE
import ExpandPropertyDetails from "./Pages/ExpandPropertyDetails";
// import Login from "./Pages/Loginn";
import ServicePage from "./Pages/servicePage";
// import Signup from "./Pages/Signup";
import PageViewTracker from "./PageViewTracker";
// import ProtectedRoute from "./ui/ProtectedRoute";
// import Settings from "./ui/Settings";

function App() {
  return (
    <>
      <PropertyProvider>
        <BrowserRouter>
          <PageViewTracker />
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
            <Route path="/ourservices" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/ukproperties"
              element={
                // <ProtectedRoute>
                <Properties />
                // </ProtectedRoute>
              }
            />

            {/* <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} /> */}
            <Route path="*" element={<PageNotFound />} />

            <Route
              path="/expandPropertyDetails/:title"
              element={<ExpandPropertyDetails />}
            />

            {/* profile */}
            {/* <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            /> */}

            {/* SERVICE PAGE */}
            <Route path="/service" element={<Service />}>
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

// function ExpandPropertyRoutes() {
//   const { summaryDetails } = useProperty();
//   return <ExpandPropertyDetails key={summaryDetails?.title} />;
// }

function ServicePageRoutes() {
  const { propertyType } = useProperty();
  return <ServicePage key={propertyType} />;
}

export default App;
