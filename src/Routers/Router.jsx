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
import AllServices from "../Pages/AllServices/AllServices";
import OrderPreview from "../Pages/OrderPage/OrderPreview";
import PaymentSuccess from "../Pages/OrderPage/PaymentSuccess";
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
        path: "/order-preview",
        element: <OrderPreview />
      },
      {
        path: "/services",
        element: <AllServices />
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
      {
        path: "/successful",
        element: <PaymentSuccess />
      }
      

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
