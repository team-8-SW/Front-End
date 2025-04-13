import React, { useEffect, useState } from "react";
import { Avatar, Typography, Button } from "@material-tailwind/react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const Leftside = () => {
  const location = useLocation();
  const [companyData, setCompanyData] = useState({
    logo_url: "",
    name: "Company Name",
    website: "",
    industry: "",
    size: "",
    organization_type: "",
    location: "",
  });

  useEffect(() => {
    const fetchLatestCompany = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/company", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const companies = res.data;
        if (companies.length > 0) {
          // Get the last created company (optionally sort if backend doesn’t return ordered)
          const latestCompany = companies[companies.length - 1];
          setCompanyData(latestCompany);
        }
      } catch (err) {
        console.error("Failed to fetch company:", err);
      }
    };

    fetchLatestCompany();
  }, []);

  const navItems = [
    { label: "Dashboard", to: "/company/dashboard" },
    { label: "Page posts", to: "/company/companyposts" },
    { label: "Analytics", to: "/company/analytics" },
    { label: "Feed", to: "/feed" },
    { label: "Activity", to: "/activity" },
    { label: "Inbox", to: "/inbox" },
    { label: "Edit page", to: "/companyform" },
    { type: "divider" },
    { label: "Jobs", to: "/company/job" },
    { type: "divider" },
  ];

  return (
    <div className="w-full bg-white font-[system-ui] text-[16px]">
      <div className="relative h-20 w-full overflow-hidden rounded-t-lg">
        <img
          src={companyData.cover_photo_url || "default-cover.jpg"}
          alt="cover"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex justify-center -mt-10 mb-3">
        <Avatar
          src={companyData.logo_url || "default-avatar.png"}
          size="xl"
          className="border-2 border-white shadow"
        />
      </div>

      <div className="text-center mb-4">
        <Typography className="font-semibold text-gray-900 text-[16px]">
          {companyData.name}
        </Typography>
        <Typography className="text-gray-600 text-[14px]">0 followers</Typography>
      </div>

      <div className="flex flex-col items-center gap-2 mb-4">
        <Button className="rounded-full bg-blue-700 px-4 py-1 text-[14px] font-semibold shadow hover:bg-blue-800 transition">
          + Create
        </Button>
        <Link to="/view">
          <Button
            variant="outlined"
            className="rounded-full border px-4 py-1 text-[14px] font-medium hover:bg-gray-100 transition flex items-center gap-1"
          >
            <span className="text-lg">👁</span> View as member
          </Button>
        </Link>
      </div>

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
                  : "text-gray-800 border-transparent hover:text-[#01754F] hover:border-[#01754F]"}`}
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
