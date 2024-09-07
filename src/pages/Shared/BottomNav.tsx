 /* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HomeOutlined, FlagOutlined, DollarOutlined, PictureOutlined, TeamOutlined, MoreOutlined, NotificationOutlined, FileTextOutlined } from '@ant-design/icons';
import { FaArtstation } from "react-icons/fa";
 

const BottomNav = () => {
  const location = useLocation();
  const [showMoreOptions, setShowMoreOptions] = useState(false);
 
  const getLinkClass = (path: any) => {
    return location.pathname === path
      ? "flex flex-col items-center justify-center text-green-500 rounded-full p-2 bg-green-600 text-white"
      : "flex flex-col items-center justify-center text-white hover:text-green-500";
  };

  const getDropdownItemClass = (path: any) => {
    return location.pathname === path
      ? "flex flex-col items-center justify-center text-green-500 p-2 bg-green-600 text-white"
      : "block px-4 py-2 hover:bg-gray-800 text-white";
  };

  const toggleMoreOptions = () => {
    setShowMoreOptions(!showMoreOptions);
  };

  return (
    <div className="fixed bottom-0 left-0 z-10 right-0 bg-black shadow-lg lg:hidden">
      <div className="flex justify-between items-center px-4 py-2">
        
        <Link to="/campaign" className={getLinkClass("/campaign")}>
          <FlagOutlined className="text-xl text-white" />
        </Link>

        <Link to="/expense" className={getLinkClass("/expense")}>
          <DollarOutlined className="text-xl text-white" />
        </Link>

        <Link to="/" className={getLinkClass("/")}>
          <HomeOutlined className="text-xl text-white" />
        </Link>

        <Link to="/gallery" className={getLinkClass("/gallery")}>
          <PictureOutlined className="text-xl text-white" />
        </Link>

        <Link to="/member" className={getLinkClass("/member")}>
          <TeamOutlined className="text-xl text-white" />
        </Link>

        <div className="relative">
          <button 
            onClick={toggleMoreOptions} 
            className={getLinkClass("") + " flex flex-col items-center justify-center"}
          >
            <MoreOutlined className="text-xl text-white" />
          </button>
          {showMoreOptions && (
            <div className="absolute right-0 bottom-12 bg-black rounded shadow-lg">
              <Link to="/notice" className={getDropdownItemClass("/notice")}>
                <NotificationOutlined className="text-base mr-2 text-white" />
          
              </Link>
              <Link to="/rules" className={getDropdownItemClass("/rules")}>
                <FileTextOutlined className="text-base mr-2 text-white" />
               
              </Link>
              <Link to="/ballLost" className={getDropdownItemClass("/ballLost")}>
                {/* <FileTextOutlined className="text-base mr-2 text-white" /> */}
                <FaArtstation className="text-base mr-2 text-white" />
               
              </Link>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default BottomNav;
