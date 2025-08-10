import { createBrowserRouter } from "react-router";
import Signup from "../Pages/Authentication/Signup";
import SignIn from "../Pages/Authentication/SignIn";
import Main from "../Layouts/Main";
import Homepage from "../Pages/HomePage/Homepage";
import ServiceDetailPage from "../Pages/Services/ServiceDetailPage";
import ConversationPage from "../Pages/ConversationPage/ConversationPage";
import Notification from "../Pages/Notification/Notification";
import SaveItems from "../Pages/SaveItems/SaveItems";
import SellerProfile from "../Pages/SellerProfile/SellerProfile";
import ManageOrder from "../Pages/ManageOrder/ManageOrder";
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
      {
        path: "/conversation",
        element: <ConversationPage />
      },
      {
        path: "/notification",
        element: <Notification />
      },
      {
        path: "/saved",
        element: <SaveItems />
      },
      {
        path: "/profile",
        element: <SellerProfile />
      },
      
      {
        path: "/order",
        element: <ManageOrder />
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
