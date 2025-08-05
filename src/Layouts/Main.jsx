import { Outlet } from "react-router";
import Navbar from "../Pages/Shared/Navbar";
import Footer from "../Pages/Shared/Footer";

const Main = () => {
  return (
    <div className="">
      <Navbar />
      <div className="container mx-auto">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Main;
