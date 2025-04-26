import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, Typography, Avatar, Button } from "@material-tailwind/react";

const MyCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/company/user", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // If it's an array
        const companiesArray = Array.isArray(res.data) ? res.data : [res.data];
        setCompanies(companiesArray);
      } catch (err) {
        console.error("Failed to fetch companies", err);
        setCompanies([]);
      }
    };

    fetchCompanies();
  }, []);

  return (
    <div className="flex flex-wrap gap-6 justify-center mt-10 px-6">
      {companies.map((company) => (
        <Card
          key={company.id}
          className="w-80 shadow-md cursor-pointer hover:shadow-xl transition-all"
          onClick={() => navigate(`/company/${company.id}`)}
        >
          {/* Cover Photo */}
          <div className="h-24 w-full rounded-t-lg bg-gray-200">
            <img
              src={company.cover_photo_url || "/default-cover.jpg"}
              alt="cover"
              className="h-full w-full object-cover rounded-t-lg"
            />
          </div>

          {/* Avatar + Info */}
          <div className="px-4 pt-[-20px] -mt-10">
            <Avatar
              src={company.logo_url || "/default-logo.png"}
              size="xl"
              className="border-4 border-white -mt-6 mb-2"
            />
            <Typography variant="h6" className="font-bold">
              {company.name}
            </Typography>
            <Typography color="gray" className="text-sm">
              {company.industry}
            </Typography>
            <Typography color="gray" className="text-sm mb-1">
              {company.location}
            </Typography>
            <Typography className="text-sm text-blue-gray-600">
              {company.description?.substring(0, 60) || "No description"}...
            </Typography>

            <div className="flex items-center gap-2 mt-3">
              <Typography variant="small" className="font-semibold text-blue-gray-700">
                🏢 {company.organization_type}
              </Typography>
            </div>

            <div className="text-sm text-gray-600 mt-1">
              🌐 {company.website?.replace(/^https?:\/\//, "") || "No website"}
            </div>

            <div className="text-sm text-gray-600 mb-3">
              👥 {company.size}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default MyCompanies;
