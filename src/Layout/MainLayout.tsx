// import Navbar from "../pages/Shared/Navbar";
// import Footer from "../pages/Shared/Footer";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import Sidebar from "./Sidebar";
import { Content, Header } from "antd/es/layout/layout";
import Footer from "../pages/Shared/Footer";
import logo from '../assets/logo/images.png'

const MainLayout = () => {
  return (
    <div>
      {/* <Navbar></Navbar>
      <Outlet></Outlet>

      <Footer></Footer> */}

      <Layout className=" ">
        <Sidebar></Sidebar>

        <Layout>
          {/* <Header style={{ padding: 0 }} /> */}

          <Header style={{ padding: 0 }}>
          <div className="block md:hidden text-center mt-3 flex items-center justify-center">
          <img src={logo} alt="BT" className="h-10 w-10 rounded-full  " />
              <h1 className="text-red-400 capitalize font-bold italic text-xl">
                BT <span className="text-yellow-300">Sports</span>{" "}
                <span className="text-green-600">Club</span>
              </h1>
            </div>
          </Header>

          <Content>
            <div className="p-6 min-h-[360px]">
              <Outlet></Outlet>
            </div>
          </Content>
          <Footer></Footer>
        </Layout>
      </Layout>
      {/* <Footer></Footer> */}
    </div>
  );
};

export default MainLayout;

// import { Outlet } from "react-router-dom";

// import { Layout } from "antd";
// import Sidebar from "./Sidebar";
// import { Header } from "antd/es/layout/layout";

// const { Content } = Layout;

// const ManageProductLayout = () => {
//   return (
//     <div>
//       <Layout className="h-screen">
//         <Sidebar></Sidebar>

//         <Layout>
//           <Header style={{ padding: 0 }} />
//           <Content>
//             <div className="p-6 min-h-[360px]">
//               <Outlet></Outlet>
//             </div>
//           </Content>
//         </Layout>
//       </Layout>
//     </div>
//   );
// };

// export default ManageProductLayout;
