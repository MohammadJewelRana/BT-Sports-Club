import { Layout, Menu, MenuProps } from "antd";

import { NavLink, useNavigate } from "react-router-dom";

import useAuth from "../utils/getUser";
import Swal from "sweetalert2";

import useSetUser from "../utils/setUser";
import logo from '../assets/logo/images.png'

const { Sider } = Layout;

const Sidebar = () => {
  const navigate = useNavigate();

  const setUser = useSetUser();

  const user = useAuth();
  console.log(user);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("userData");
    if (setUser) {
      setUser(null);
    }
    // Show success alert
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Successfully Logged out",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      // Navigate to the home page after the alert
      navigate("/");
    });
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <NavLink to="/">Dashboard </NavLink>,
    },
    {
      key: "6",
      label: <NavLink to="/campaign">Campaign </NavLink>,
    },
    {
      key: "678",
      label: <NavLink to="/expense">Expense </NavLink>,
    },
    {
      key: "3",
      label: <NavLink to="/member">Members </NavLink>,
    },
    {
      key: "4",
      label: <NavLink to="/gallery">Gallery </NavLink>,
    },
    {
      key: "5",
      label: <NavLink to="/rules">Rules </NavLink>,
    },
  
    {
      key: "685",
      label: <NavLink to="/notice">Notice </NavLink>,
    },
  ];


  const adminItems: MenuProps["items"] = [
   
    {
      key: "2",
      label: "Manage ",
      children: [
        {
          key: "21",
          label: <NavLink to="/add-user">Add User </NavLink>,
        },
        {
          key: "28",
          label: <NavLink to="/fund-collect">   Fund Raise </NavLink>,
        },
        {
          key: "2887",
          label: <NavLink to="/expense">   Expense </NavLink>,
        },
        {
          key: "22",
          label: <NavLink to="/add-notice">Notice </NavLink>,
        },
      ],
    },

    // {
    //   key: "36",
    //   label: <NavLink to="/member">Notice </NavLink>,
    // },
  
    // {
    //   key: "36",
    //   label: <NavLink to="/add-user"> </NavLink>,
    // },
  
  
 
  ];

  return (
    <Sider
      className="-mt-14 md:mt-[0px]"
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      {/* logo design or name design */}
      <div
        style={{
          color: "white",
          textAlign: "center",
          height: "4rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={logo} alt="BT" className="h-10 w-10 rounded-full  " />
        <h1 className="text-red-400  capitalize font-bold italic text-xl ml-2">
          {" "}
          BT <span className="text-yellow-300">Sports</span> <span className="text-green-600">Club</span>
        </h1>
      </div>


      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={items} //side nav menu
        className="mt-8"
      ></Menu>


     {
      user && 
      <>
        <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={adminItems} //side nav menu
        className="mt-8"
      ></Menu>
      </>
     }

      <div className="text-white mt-12 border-t-2 ">
        <div className="p-4 mt-4">
          {user ? (
            <>
              <button onClick={handleLogout} className="text-gray-300 pt-4">
                Logout{" "}
              </button>
            </>
          ) : (
            <>
              <button onClick={handleLogin} className="text-gray-300 pt-4">
                Login{" "}
              </button>
            </>
          )}
        </div>
      </div>
    </Sider>
  );
};

export default Sidebar;
