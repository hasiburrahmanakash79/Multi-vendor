import { Outlet } from "react-router";
import Navbar from "../Pages/Shared/Navbar";

const Main = () => {
  return (
    <div className="">
      <Navbar />
      <div className="container mx-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Main;
