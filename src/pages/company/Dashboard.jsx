import React from "react";
import { Card, Typography, Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const {companyid} = useParams(); // Assuming you have access to companyid from the URL
  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">

      {/* Today's Actions Section */}
      <Card className="p-4 bg-white shadow-md rounded-md">
        <Typography variant="h6" className="mb-2">Today’s actions</Typography>
        <Typography variant="small" className="text-gray-500 mb-2">
          Pages that complete these actions regularly grow 4x faster
        </Typography>
        <div className="flex items-center gap-3 mt-3">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
            ✅
          </div>
          <div>
            <Typography className="font-medium">Done for now</Typography>
            <Typography className="text-sm text-gray-500">Check back for more actions later</Typography>
          </div>
        </div>
      </Card>

      {/* Manage Recent Posts Section */}
      <Card className="p-4 bg-white shadow-md rounded-md">
        <Typography variant="h6" className="mb-2">Manage recent posts</Typography>
        <Typography variant="small" className="text-gray-500 mb-4">
          Manage your page’s content and amplify your reach with boosting.
        </Typography>

        <div className="flex justify-between items-center border p-4 rounded-md">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gray-300 rounded-md" />
            <div>
              <Typography variant="small" className="font-semibold">Test Post</Typography>
              <Typography variant="small" className="text-gray-600">2w • 🌍</Typography>
              <Typography className="mt-1 text-sm">test</Typography>
            </div>
          </div>
          <Button variant="outlined" className="rounded-full px-4" onClick={()=>navigate(`/company/${companyid}/companyposts`)}>Boost</Button>
        </div>

        {/* Optionally: Add a "You're all caught up" card */}
        <div className="text-center mt-6 text-gray-500">
          <Typography>📋 All caught up. Pages that post 2x a week grow 5x faster</Typography>
        </div>
      </Card>

    </div>
  );
};

export default Dashboard;
