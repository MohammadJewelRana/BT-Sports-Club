import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import MainLayout from "../Layout/MainLayout";
import Rules from "../pages/Rules/Rules";
import Member from "../pages/Member/Member";
import Campaign from "../pages/Campaign/Campaign";
import LoginForm from "../pages/Login/LoginForm";
import AddUser from "../pages/Manage/AddUser";

import Notice from "../pages/Notice/Notice";
import ShowNotice from "../pages/Manage/ShowNotice";

import ShowCampaign from "../pages/Manage/ShowCampaign";
import ShowExpense from "../pages/Manage/ShowExpense";
import Gallery from "../pages/Gallery/Gallery";
import LoadingPage from "../pages/Shared/LoadingPage";
import BallLost from "../pages/Manage/BallLost";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <LoadingPage></LoadingPage>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/rules",
        element: <Rules></Rules>,
      },
      {
        path: "/member",
        element: <Member state={null}></Member>,
      },
      {
        path: "/campaign",
        element: <Campaign></Campaign>,
      },
      {
        path: "/gallery",
        element: <Gallery></Gallery>,
      },
      {
        path: "/expense",
        element: <ShowExpense></ShowExpense>,
      },

      {
        path: "/login",
        element: <LoginForm></LoginForm>,
      },
      {
        path: "/add-user",
        element: <AddUser></AddUser>,
      },
      {
        path: "/add-notice",
        element: <ShowNotice></ShowNotice>,
      },
      {
        path: "/fund-collect",
        element: <ShowCampaign></ShowCampaign>,
      },
      // {
      //   path: "/add-notice",
      //   element: <AddNotice></AddNotice>,
      // },
      {
        path: "/notice",
        element: <Notice></Notice>,
      },
      {
        path: "/ballLost",
        element: <BallLost status={null}></BallLost>,
      },

      // {
      //   path: "/",
      //   element: <Home></Home>,
      // },
    ],
  },
]);

export default router;
