import React, { useState, useEffect } from "react";
import { Avatar, Typography, Button } from "@material-tailwind/react";
import { Link, useLocation } from "react-router-dom";

const Leftside = ({ loggedUser }) => {
  const location = useLocation();

  const [companyData, setCompanyData] = useState({
    logo: "",
    name: "Company Name",
    website: "",
    industry: "",
    size: "",
    type: "",
    email: "",
  });

  useEffect(() => {
    if (loggedUser?.company) {
      setCompanyData(loggedUser.company);
    }
  }, [loggedUser]);

  const navItems = [
    { label: "Dashboard", to: "/dashboard" },
    { label: "Page posts", to: "/company/companyposts" },
    { label: "Analytics", to: "/analytics" },
    { label: "Feed", to: "/feed" },
    { label: "Activity", to: "/activity" },
    { label: "Inbox", to: "/inbox" },
    { label: "Edit page", to: "/companyform" },
    { type: "divider" },
    { label: "Jobs", to: "/jobs" },
    { type: "divider" },
  ];

  return (
    <div className="w-full bg-white font-[system-ui] text-[16px]">
      {/* Cover */}
      <div className="relative h-20 w-full overflow-hidden rounded-t-lg">
        <img
          src={companyData.logo || "default-cover.jpg"}
          alt="cover"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Avatar */}
      <div className="flex justify-center -mt-10 mb-3">
        <Avatar
          src={companyData.logo || "default-avatar.png"}
          size="xl"
          className="border-2 border-white shadow"
        />
      </div>

      {/* Info */}
      <div className="text-center mb-4">
        <Typography className="font-semibold text-gray-900 text-[16px]">
          {companyData.name || "test"}
        </Typography>
        <Typography className="text-gray-600 text-[14px]">0 followers</Typography>
      </div>

      {/* Buttons */}
      <div className="flex flex-col items-center gap-2 mb-4">
        <Button className="rounded-full bg-blue-700 px-4 py-1 text-[14px] font-semibold shadow hover:bg-blue-800 transition">
          + Create
        </Button>
        <Button
          variant="outlined"
          className="rounded-full border px-4 py-1 text-[14px] font-medium hover:bg-gray-100 transition flex items-center gap-1"
        >
          <span className="text-lg">👁</span> View as member
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col">
        {navItems.map((item, index) => {
          if (item.type === "divider") {
            return <hr key={index} className="my-2 border-gray-200" />;
          }

          const isActive = location.pathname === item.to;

          return (
            <Link
              key={index}
              to={item.to}
              className={`px-4 py-2 transition-all duration-200 border-l-4
                ${isActive
                  ? "text-[#01754F] font-semibold border-[#01754F]"
                  : "text-gray-800 border-transparent hover:text-[#01754F] hover:border-[#01754F]"}
              `}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Leftside;