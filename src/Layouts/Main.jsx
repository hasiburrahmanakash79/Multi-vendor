import { Outlet, useLocation } from "react-router";
import Navbar from "../Pages/Shared/Navbar";
import Footer from "../Pages/Shared/Footer";
import ScrollToTop from "../components/ScrollToTop";

const Main = () => {
  const location = useLocation();
  const hideFooter = location.pathname === "/conversation";

  return (
    <div className="">
      <Navbar />
      <ScrollToTop/>
      <div className="container mx-auto mt-30 md:mt-15">
        <Outlet />
      </div>
      {!hideFooter && <Footer />}
    </div>
  );
};

export default Main;
