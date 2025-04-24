import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { IoHomeSharp } from "react-icons/io5";
import { MdWork, MdPeople } from "react-icons/md";
import { AiFillMessage } from "react-icons/ai";
import { FaBell } from "react-icons/fa";
import { PiDotsNine } from "react-icons/pi";
import { UserCircleIcon } from "@heroicons/react/24/outline";

const Nav2 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mode, setMode] = useState("search");

  const [searchParams, setSearchParams] = useState({
    keyword: "",
    industry: "",
    location: "",
  });

  const [filterParams, setFilterParams] = useState({
    experienceLevel: "",
    company: "",
    minSalary: "",
    maxSalary: "",
  });

  const isActive = (path) => location.pathname === path;

  const handleSubmit = () => {
    const queryParams = new URLSearchParams(
      mode === "search" ? searchParams : filterParams
    ).toString();
    navigate(`/detailedjobs?mode=${mode}&${queryParams}`);
  };

  return (
    <>
      <div className="flex justify-center gap-5 items-center bg-white shadow px-6 py-2 sticky top-0 z-50">
        <div className="flex items-center gap-4 ">
          <Link to="/">
            <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" className="w-8" alt="logo" />
          </Link>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className="border px-2 py-1 rounded text-sm"
          >
            <option value="search">Search Jobs</option>
            <option value="filter">Filter Jobs</option>
          </select>

          {mode === "search" ? (
            <>
              <input
                type="text"
                placeholder="Keyword"
                className="border px-2 py-1 text-sm rounded w-36"
                value={searchParams.keyword}
                onChange={(e) => setSearchParams({ ...searchParams, keyword: e.target.value })}
              />
              <input
                type="text"
                placeholder="Industry"
                className="border px-2 py-1 text-sm rounded w-32"
                value={searchParams.industry}
                onChange={(e) => setSearchParams({ ...searchParams, industry: e.target.value })}
              />
              <input
                type="text"
                placeholder="Location"
                className="border px-2 py-1 text-sm rounded w-32"
                value={searchParams.location}
                onChange={(e) => setSearchParams({ ...searchParams, location: e.target.value })}
              />
            </>
          ) : (
            <>
              <select
                className="border px-2 py-1 text-sm rounded w-36"
                value={filterParams.experienceLevel}
                onChange={(e) => setFilterParams({ ...filterParams, experienceLevel: e.target.value })}
              >
                <option value="">Experience Level</option>
                <option value="Entry-level">Entry-level</option>
                <option value="Mid-level">Mid-level</option>
                <option value="Senior-level">Senior-level</option>
              </select>

              <select
                className="border px-2 py-1 text-sm rounded w-32"
                value={filterParams.company}
                onChange={(e) => setFilterParams({ ...filterParams, company: e.target.value })}
              >
                <option value="">Company</option>
                <option value="Google">Google</option>
                <option value="Amazon">Amazon</option>
                <option value="Meta">Meta</option>
                <option value="Oracle">Oracle</option>
              </select>

              <select
                className="border px-2 py-1 text-sm rounded w-28"
                value={filterParams.minSalary}
                onChange={(e) => setFilterParams({ ...filterParams, minSalary: e.target.value })}
              >
                <option value="">Min Salary</option>
                <option value="1000">1000</option>
                <option value="2000">2000</option>
                <option value="4000">4000</option>
                <option value="6000">6000</option>
              </select>

              <select
                className="border px-2 py-1 text-sm rounded w-28"
                value={filterParams.maxSalary}
                onChange={(e) => setFilterParams({ ...filterParams, maxSalary: e.target.value })}
              >
                <option value="">Max Salary</option>
                <option value="5000">5000</option>
                <option value="7000">7000</option>
                <option value="10000">10000</option>
                <option value="15000">15000</option>
              </select>
            </>
          )}

          <button onClick={handleSubmit} className="bg-blue-600 text-white text-sm px-4 py-1 rounded">
            Search
          </button>
        </div>

        <div className="flex gap-5 text-gray-700">
          {[{ to: "/", icon: IoHomeSharp, label: "Home" },
            { to: "/network", icon: MdPeople, label: "Network" },
            { to: "/jobs", icon: MdWork, label: "Jobs" },
            { to: "/messages", icon: AiFillMessage, label: "Messaging" },
            { to: "/notifications", icon: FaBell, label: "Notifications" }].map(({ to, icon: Icon, label }) => (
              <Link key={to} to={to} className="flex flex-col items-center">
                <Icon className={`h-5 w-5 ${isActive(to) ? "text-blue-600" : "text-gray-700"}`} />
                <span className="text-xs">{label}</span>
              </Link>
            ))}
          <UserCircleIcon className="h-7 w-7" />
          <PiDotsNine className="h-7 w-7" />
        </div>
      </div>
    </>
  );
};

export default Nav2;
