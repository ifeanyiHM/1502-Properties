import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { PropertyProvider } from "./context/PropertyContext";
import useProperty from "./context/useProperty";
import PageViewTracker from "./PageViewTracker";
import { PrevTopPage, ScrollToTop } from "./Utilities/ScrollToTop";
import { Spinner } from "./Utilities/Spinner";

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
import FAQ from "./Components/Main/Faq";
import FeaturedArticles from "./Components/Main/FeaturedArticles";
import FeaturedProperties from "./Components/Main/FeaturedProperties";
import OurServices from "./Components/Main/OurServices";
import SearchProperties from "./Components/Main/SearchProperties";

import AdminRoute from "./ui/AdminRoute";
import ProtectedRoute from "./ui/ProtectedRoute";
const Settings = lazy(() => import("./ui/Settings"));

//ROUTER PAGES
const About = lazy(() => import("./Pages/About"));
const Contact = lazy(() => import("./Pages/Contact"));
const Blogs = lazy(() => import("./Pages/Blogs"));
const BlogDetailsPage = lazy(() => import("./Pages/BlogDetailsPage"));
const PageNotFound = lazy(() => import("./Pages/PageNotFound"));
const Service = lazy(() => import("./Pages/Service"));
const ServicePage = lazy(() => import("./Pages/servicePage"));
const Properties = lazy(() => import("./Pages/Properties"));
const ViewPropertyRequest = lazy(() => import("./Pages/ViewPropertyRequest"));
const ExpandPropertyDetails = lazy(
  () => import("./Pages/ExpandPropertyDetails")
);

//ADMIN ROUTE PAGES
const AdminPage = lazy(() => import("./Pages/AdminPage"));
const ApproveProperties = lazy(() => import("./Pages/ApproveProperties"));
const DeleteProperties = lazy(() => import("./Pages/DeleteProperties"));

//AUTH ROUTE PAGES
const Login = lazy(() => import("./Pages/Loginn"));
const Profile = lazy(() => import("./Pages/Profile"));
const PropertyForm = lazy(() => import("./Pages/PropertyForm"));
const Signup = lazy(() => import("./Pages/Signup"));
const ResetPassword = lazy(() => import("./Pages/ResetPassword"));

function App() {
  return (
    <>
      <AuthProvider>
        <PropertyProvider>
          <BrowserRouter>
            <PageViewTracker />
            <PrevTopPage />
            <PageNav>
              <Logo />
              <NavList />
            </PageNav>
            <Suspense fallback={<Spinner />}>
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
                        <FeaturedArticles />
                        <FAQ />
                      </Main>
                    </>
                  }
                />
                {/* ROUTER PAGES */}
                <Route path="/ourservices" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/blog/:id" element={<BlogDetailsPage />} />
                <Route path="/ukproperties" element={<Properties />} />
                <Route
                  path="/view-property-request"
                  element={<ViewPropertyRequest />}
                />

                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="*" element={<PageNotFound />} />

                <Route
                  path="/expandPropertyDetails/:title"
                  element={<ExpandPropertyDetails />}
                />

                <Route
                  path="/propertyForm"
                  element={
                    <ProtectedRoute>
                      <PropertyForm />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/adminPage"
                  element={
                    <AdminRoute>
                      <AdminPage />
                    </AdminRoute>
                  }
                >
                  <Route index element={<ApproveProperties />} />
                  <Route
                    path="approveproperty"
                    element={<ApproveProperties />}
                  />
                  <Route path="deleteproperty" element={<DeleteProperties />} />
                </Route>

                {/* profile */}
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/settings"
                  element={
                    <ProtectedRoute>
                      <Settings />
                    </ProtectedRoute>
                  }
                />

                {/* SERVICE PAGE */}
                <Route path="/service" element={<Service />}>
                  <Route path=":propertyType" element={<ServicePageRoutes />} />
                </Route>
              </Routes>
            </Suspense>

            {/* FOOTER */}
            <Footer />
            <ScrollToTop />
          </BrowserRouter>
        </PropertyProvider>
      </AuthProvider>
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
