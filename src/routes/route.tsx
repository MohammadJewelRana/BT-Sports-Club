import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import MainLayout from "../Layout/MainLayout";
import Rules from "../pages/Rules/Rules";
import Member from "../pages/Member/Member";
import Campaign from "../pages/Campaign/Campaign";
import LoginForm from "../pages/Login/LoginForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,

    children: [
      {
       index:true,
        element: <Home></Home>,
      },
      {
        path:'/rules',
        element:  <Rules></Rules>,
      },
      {
        path:'/member',
        element:  <Member></Member>,
      },
      {
        path:'/campaign',
        element:  <Campaign></Campaign>,
      },

      {
        path:'/login',
        element:   <LoginForm></LoginForm>,
      },

      // {
      //   path: "/",
      //   element: <Home></Home>,
      // },



    ],
  },
]);

export default router;
