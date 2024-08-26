import React, { useCallback } from "react";
import { AiFillHome } from "react-icons/ai";
import { GiCricketBat, GiNewspaper, GiTrophyCup } from "react-icons/gi";
import { FaNewspaper } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // For navigation

const Tabbar = ({ navigationData }) => {
  const navigate = useNavigate();

  const setCurrentRoute = (item) => {
    switch (item) {
      case "Home":
        navigate("/");
        break;
      case "Cricket":
        navigate("/Category/Cricket");
        break;
      case "News":
        navigate("/News");
        break;
      case "Matches":
        navigate("/Schedule");
        break;
      case "Latest":
        navigate("/About");
        break;
      default:
        navigate("/");
    }
  };

  const getTabIcon = useCallback((item) => {
    switch (item) {
      case "Home":
        return <AiFillHome />;
      case "Cricket":
        return <GiCricketBat />;
      case "News":
        return <FaNewspaper />;
      case "Matches":
        return <GiTrophyCup />;
      case "Latest":
        return <GiNewspaper />;
    }
  }, []);

  return (
    <div>
    <nav className="flex md:hidden flex-row items-center justify-around px-8 h-18 visible md:invisible fixed bottom-0 w-full rounded-t-4xl text-2xl bg-zinc-900">
      {navigationData.map((item, index) => (
        <span
          key={index}
          className=" text-gray-400 hover:text-gray-700 pt-2 pb-3 cursor-pointer w-16 h-full flex items-center justify-center border-t-4 border-gray-700"
          onClick={() => setCurrentRoute(item)}
        >
          <span className="-mb-1">{getTabIcon(item)}</span>
        </span>
      ))}
    </nav>
    </div>
  );
};

export default Tabbar;
