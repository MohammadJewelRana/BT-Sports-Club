import { Layout } from "antd";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { Content, Header } from "antd/es/layout/layout";
import Footer from "../pages/Shared/Footer";
import logo from "../assets/logo/images.png";
import BottomNav from "../pages/Shared/BottomNav";

const MainLayout = () => {
  return (
    <Layout className="min-h-screen">
      <Sidebar />

      <Layout className="lg:ml-200">
        <Header style={{ padding: 0 }}>
          <div className="block lg:hidden text-center mt-3 flex items-center justify-center">
            <img src={logo} alt="BT" className="h-10 w-10 rounded-full" />
            <h1 className="text-red-400 capitalize font-bold italic text-xl">
              BT <span className="text-yellow-300">Sports</span>{" "}
              <span className="text-green-600">Club</span>
            </h1>
          </div>
        </Header>

        <Content>
          <div className="p-6 min-h-[360px]">
            <Outlet />
          </div>
        </Content>
        <Footer />
      </Layout>
      <BottomNav></BottomNav>
    </Layout>
  );
};

export default MainLayout;
