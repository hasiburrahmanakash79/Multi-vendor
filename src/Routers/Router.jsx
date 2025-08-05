import { createBrowserRouter } from "react-router";
import Signup from "../Pages/Authentication/Signup";
import SignIn from "../Pages/Authentication/SignIn";
import Main from "../Layouts/Main";
import Homepage from "../Pages/HomePage/Homepage";
import ServiceDetailPage from "../Pages/Services/ServiceDetailPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Homepage/>
      },
      {
        path: "/serviceDetails/:id",
        element: <ServiceDetailPage />
      },
      

    ],
  },
  
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

export default router;
