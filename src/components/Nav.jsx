import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import { PiDotsNine } from "react-icons/pi";
import { UserCircleIcon, PlusIcon } from "@heroicons/react/24/outline";
import { IoHomeSharp } from "react-icons/io5";
import { MdWork, MdPeople } from "react-icons/md";
import { AiFillMessage } from "react-icons/ai";
import { FaBell } from "react-icons/fa";
import { unReadCount } from "../services/api";
import UserSearch from "../pages/network/UserSearch";

const Nav = () => {
  const location = useLocation();
  const hiddenPaths = ["/login", "/signup", "/detailedjobs", "/detailedjobs/:jobId", "/adminhome"];

  if (location.pathname.startsWith("/detailedjobs")) return null;
  if (hiddenPaths.includes(location.pathname)) return null;

  const [isAppsDropdownOpen, setIsAppsDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const count = await unReadCount(token);
        setUnreadCount(count);
      } catch (error) {
        console.error("Error fetching unread notifications count:", error);
      }
    };

    fetchUnreadCount();
    const interval = setInterval(fetchUnreadCount, 1000);
    return () => clearInterval(interval);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="sticky top-0 left-0 w-full bg-white shadow-md z-50 h-[52px]">
      <div className="flex gap-40 items-center px-3 max-w-screen-xl mx-auto py-[5px]">
        <div className="flex items-center gap-0">
          <Link to="/">
            <Typography as="div" className="p-1 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" width="41" height="41" viewBox="0 0 48 48">
                <path fill="#0288D1" d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"></path>
                <path fill="#FFF" d="M12 19H17V36H12zM14.485 17h-.028C12.965 17 12 15.888 12 14.499 12 13.08 12.995 12 14.514 12c1.521 0 2.458 1.08 2.486 2.499C17 15.887 16.035 17 14.485 17zM36 36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698-1.501 0-2.313 1.012-2.707 1.99C24.957 25.543 25 26.511 25 27v9h-5V19h5v2.616C25.721 20.5 26.85 19 29.738 19c3.578 0 6.261 2.25 6.261 7.274L36 36 36 36z"></path>
              </svg>
            </Typography>
          </Link>
          <UserSearch token={token} />
        </div>

        <div className="flex gap-6 text-gray-600">
          {[
            { to: "/", icon: IoHomeSharp, label: "Home" },
            { to: "/network", icon: MdPeople, label: "Network" },
            { to: "/jobs", icon: MdWork, label: "Jobs" },
            { to: "/messages", icon: AiFillMessage, label: "Messaging" },
            { to: "/notifications", icon: FaBell, label: "Notifications" },
          ].map(({ to, icon: Icon, label }) => (
            <Link key={to} to={to} className="flex flex-col items-center group">
              <div className="relative">
                <Icon
                  className={`h-6 w-6 ${isActive(to) ? "text-blue-700" : "text-gray-900 group-hover:text-blue-700"}`}
                />
                {label === "Notifications" && unreadCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </div>
              <span className={`text-xs mt-1 ${isActive(to) ? "text-blue-700 font-semibold" : "text-gray-500 group-hover:text-blue-700"}`}>
                {label}
              </span>
              {isActive(to) && <div className="w-6 h-1 bg-blue-700 rounded-full mt-1"></div>}
            </Link>
          ))}

          {/* Profile dropdown */}
          <div className="relative">
            <button onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)} className="flex flex-col items-center text-gray-500 hover:text-blue-700 focus:outline-none">
              <UserCircleIcon className="h-6 w-6" />
              <span className="text-xs mt-0">Me</span>
            </button>
            {isProfileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg py-2 z-50">
                <Link to="/profile" onClick={() => setIsProfileDropdownOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">View Profile</Link>
                <Link to="/settings" onClick={() => setIsProfileDropdownOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Settings</Link>
                <button onClick={() => { setIsProfileDropdownOpen(false); logout(); }} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left">Logout</button>
              </div>
            )}
          </div>

          {/* Apps dropdown */}
          <div className="relative">
            <button onClick={() => setIsAppsDropdownOpen(!isAppsDropdownOpen)} className="flex flex-col items-center text-gray-500 hover:text-blue-700 focus:outline-none">
              <PiDotsNine className="h-6 w-6" />
              <span className="text-xs mt-0">Apps</span>
            </button>
            {isAppsDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg py-2 z-50">
                <Link to="/companyform" onClick={() => setIsAppsDropdownOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  <div className="flex items-center gap-2">
                    <Typography className="text-gray-700 text-[15px]">Create a Company Page</Typography>
                    <PlusIcon className="h-6 w-6" />
                  </div>
                </Link>
                <Link to="/business" onClick={() => setIsAppsDropdownOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Business Tools</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
