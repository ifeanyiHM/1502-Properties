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

// const propertySummary = [
//   {
//     src: featured1,
//     title: "LUXURY 4 BEDROOM DETACHED DUPLEX WITH BQ",
//     price: "₦ 120,000,000",
//     location: "Ajah Lagos",
//   },
//   {
//     src: featured2,
//     title: "LUXURY 4 BEDROOM DETACHED DUPLEX WITH BQ",
//     price: "₦ 120,000,000",
//     location: "Ajah Lagos",
//   },
//   {
//     src: featured3,
//     title: "LUXURY 4 BEDROOM DETACHED DUPLEX WITH BQ",
//     price: "₦ 120,000,000",
//     location: "Ajah Lagos",
//   },
// ];

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
            <Route index element={<Buy />} />
            <Route path="buy" element={<Buy />} />
            <Route path="rent" element={<Rent />} />
            <Route path="shortlet" element={<Shortlet />} />
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
