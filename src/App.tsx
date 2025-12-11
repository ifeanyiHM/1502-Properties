import { lazy, Suspense, useEffect } from "react";
import { Route, Routes, useParams } from "react-router-dom";
import useProperty from "./context/useProperty";
import PageViewTracker from "./PageViewTracker";
import { PrevTopPage, ScrollToTop } from "./Utilities/ScrollToTop";
import { Spinner } from "./Utilities/Spinner";

//PAGE STRUCTURE
import Footer from "./Components/Footer/Footer";
import Main from "./Components/Main/Main";

//HEADER STRUCTURE
import NewHeader from "./Components/Header/NewHeader";
import Logo from "./Components/Header/Logo";
import NavList from "./Components/Header/NavList";
import PageNav from "./Components/Header/PageNav";

// MAIN STRUCTURE
import FAQ from "./Components/Main/Faq";
import FeaturedArticles from "./Components/Main/FeaturedArticles";
import NewFeaturedProperties from "./Components/Main/NewFeaturedProperties";
import NewOurServices from "./Components/Main/NewOurServices";
import SearchProperties from "./Components/Main/SearchProperties";

import supabase from "./services/supabase";
import AdminRoute from "./ui/AdminRoute";
import ProtectedRoute from "./ui/ProtectedRoute";
import { generateUniqueUserCode } from "./Utilities/Constant";
import TermsAndConditions from "./Pages/TermsandCondition";
import Header from "./Components/Header/Header";
import Slider from "./Components/Header/Slider";
import Wrapper from "./Components/Header/Wrapper";
import HeaderTextSlider from "./Components/Header/HeaderTextDescription";
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
const NewExpandPropertyDetails = lazy(
  () => import("./Pages/NewExpandPropertyDetails")
);

//ADMIN ROUTE PAGES
const AdminPage = lazy(() => import("./Pages/AdminPage"));
const ApproveProperties = lazy(() => import("./Pages/ApproveProperties"));
const DeleteProperties = lazy(() => import("./Pages/DeleteProperties"));
const CreateBlogs = lazy(() => import("./Pages/CreateBlogs"));

//AUTH ROUTE PAGES
const Login = lazy(() => import("./Pages/Loginn"));
const Profile = lazy(() => import("./Pages/Profile"));
const PropertyForm = lazy(() => import("./Pages/PropertyForm"));
const Signup = lazy(() => import("./Pages/Signup"));
const ResetPassword = lazy(() => import("./Pages/ResetPassword"));

function App() {
  const { isHeader } = useProperty();

  useEffect(() => {
    const assignUserCodeIfNeeded = async () => {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData?.user;

      if (user && !user.user_metadata?.userCode) {
        const userCode = await generateUniqueUserCode();

        const { error: updateError } = await supabase.auth.updateUser({
          data: { userCode },
        });

        if (updateError) {
          console.error("Failed to update user metadata:", updateError.message);
        }
      }
    };

    assignUserCodeIfNeeded();
  }, []);

  return (
    <>
      <PageViewTracker />
      <PrevTopPage />
      {isHeader && (
        <PageNav>
          <Logo />
          <NavList />
        </PageNav>
      )}
      <Suspense fallback={<Spinner />}>
        <Routes>
          {/* LANDING PAGE */}

          <Route
            index
            element={
              <>
                <PageNav>
                  <Logo />
                  <NavList />
                </PageNav>
                <NewHeader />

                {/* MAIN */}
                <Main>
                  <SearchProperties />
                  <Header>
                    <Wrapper>
                      <HeaderTextSlider />
                      <Slider />
                    </Wrapper>
                  </Header>
                  <NewFeaturedProperties />
                  <NewOurServices />
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
          <Route path="/termsandconditions" element={<TermsAndConditions />} />
          <Route path="*" element={<PageNotFound />} />

          <Route
            path="/expandPropertyDetails/:title"
            element={<NewExpandPropertyDetails />}
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
            <Route path="approveproperty" element={<ApproveProperties />} />
            <Route path="deleteproperty" element={<DeleteProperties />} />
            <Route path="createblogs" element={<CreateBlogs />} />
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
          {/* <Route path="/service" element={<Service />}>
            <Route path=":propertyType" element={<ServicePageRoutes />} />
          </Route> */}

          {/* SERVICE PAGE BASE */}
          <Route path="/service" element={<Service />}>
            {/* /service/:propertyType */}
            <Route path=":propertyType" element={<ServicePageRoutes />} />

            {/* /service/:propertyType/:subtype */}
            <Route
              path=":propertyType/:subtype"
              element={<ServicePageRoutes />}
            />
          </Route>
        </Routes>
      </Suspense>

      {/* FOOTER */}
      <Footer />
      <ScrollToTop />
    </>
  );
}

function ServicePageRoutes() {
  const { propertyType: urlType, subtype: urlSubtype } = useParams();
  const {
    propertyType,
    setPropertyType,
    selectedType,
    setSelectedType,
    dispatch,
  } = useProperty();

  // Sync URL propertyType with global state
  useEffect(() => {
    if (!urlType) return;

    if (propertyType !== urlType) {
      setPropertyType(urlType);
      dispatch({ type: "activeProperty", payload: urlType });
    }
  }, [urlType, propertyType, setPropertyType, dispatch]);

  // Sync URL subtype with the global selectedType
  useEffect(() => {
    if (urlSubtype) {
      if (selectedType !== urlSubtype) {
        setSelectedType(urlSubtype);
      }
    } else {
      if (selectedType) {
        setSelectedType("");
      }
    }
  }, [urlSubtype, selectedType, setSelectedType]);

  return <ServicePage key={`${urlType}/${urlSubtype}`} />;
}

export default App;
