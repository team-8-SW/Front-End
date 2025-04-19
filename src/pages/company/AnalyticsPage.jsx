import React, { useEffect, useState } from "react";
import ContentTab from "./ContentTab";
import VisitorsTab from "./VisitorsTab";
import FollowersTab from "./FollowersTab";
import { useParams } from "react-router-dom";

const AnalyticsPage = ({ loggedUser }) => {
  const [analyticsData, setAnalyticsData] = useState({});
  const [activeTab, setActiveTab] = useState("content");
  const {companyid}=useParams()
  console.log("Company ID in main Analytics:", companyid); // ✅ Log loggedUser

  useEffect(() => {
    if (loggedUser?.company?.analytics) {
      setAnalyticsData(loggedUser.company.analytics);
    }
  }, [loggedUser]);

  const renderTabComponent = () => {
    switch (activeTab) {
      case "visitors":
        return <VisitorsTab data={analyticsData.visitors} months={analyticsData.content?.months} companyid={companyid} />;
      case "followers":
        return <FollowersTab analyticsData={analyticsData} companyid={companyid}/>; // ✅ FIXED: pass full object
      default:
        return <ContentTab data={analyticsData.content} companyid={companyid} />;
    }
  };

  return (
    <div className="p-6">
      {/* Tab Header */}
      <div className="flex items-center border-b mb-4">
        {["content", "visitors", "followers"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`mr-6 text-[15px] font-medium pb-2 border-b-2 ${
              activeTab === tab
                ? "text-black border-black"
                : "text-gray-500 border-transparent hover:border-black hover:text-black"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
      

      {/* Date & Export */}
      <div className="flex justify-between items-center mb-4">
        <button className="border px-4 py-1 text-sm rounded-md text-gray-700">
          Mar 4, 2025 - Apr 2, 2025
        </button>
        <button className="flex items-center gap-1 text-white bg-blue-600 px-3 py-1 rounded text-sm">
          📥 Export
        </button>
      </div>
      {renderTabComponent()}
      
    </div>
  );
};

export default AnalyticsPage;