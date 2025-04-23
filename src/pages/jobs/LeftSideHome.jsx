import React from "react";
import { Typography } from "@material-tailwind/react";
import { Link, useLocation } from "react-router-dom";
import {
  ListBulletIcon,
  BookmarkIcon,
  ChartBarIcon,
  PencilSquareIcon,
  BriefcaseIcon
} from "@heroicons/react/24/solid";

const LeftsideHome = () => {
  const location = useLocation();

  const navItems = [
    { label: "Preferences", to: "/preferences", icon: ListBulletIcon },
    { label: "My Jobs", to: "/myjobs", icon: BookmarkIcon },
    { label: "My Career Insights", to: "/insights", icon: ChartBarIcon },
    { divider: true },
    { label: "Post a free job", to: "/postjob", icon: PencilSquareIcon, color: "text-blue-600" },
    { label: "Manage job posts", to: "/managejobs", icon: BriefcaseIcon },
  ];

  return (
    <div className="bg-white shadow rounded-lg p-4 w-full font-[system-ui] text-[16px]">
      {navItems.map((item, index) => {
        if (item.divider) {
          return <hr key={index} className="my-3 border-gray-200" />;
        }

        const isActive = location.pathname === item.to;
        const Icon = item.icon;

        return (
          <Link
            to={item.to}
            key={index}
            className={`flex items-center gap-3 py-2 px-2 rounded-lg transition ${
              isActive
                ? "bg-gray-100 text-blue-700 font-semibold"
                : "hover:bg-gray-50 text-gray-800"
            }`}
          >
            <Icon className={`w-5 h-5 ${item.color || "text-gray-700"}`} />
            <Typography className="text-sm">{item.label}</Typography>
          </Link>
        );
      })}
    </div>
  );
};

export default LeftsideHome;
