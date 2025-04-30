import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Tab,
  Tabs,
  TabsHeader,
  Avatar,
} from "@material-tailwind/react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ConnectButton from "../network/ConnectButton";
import CompanyPostsDetails from "./companyPostsDetails";
import CompanyJobsTab from "./CompanyJobsTab";
import { api } from "../../services/profile"; // Adjust the import path as necessary

const ViewCompany = ({ loggedUser }) => {
  const [companyData, setCompanyData] = useState(null);
  const [posts, setPosts] = useState([]);
  const [companyJobs, setCompanyJobs] = useState([]);
  const [activeTab, setActiveTab] = useState("home");
  const { companyid } = useParams();
  const [adminId, setAdminId] = useState(1);
  const [AdminData, setAdminData] = useState("");

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get(`/api/company/${companyid}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCompanyData(res.data);
        setAdminId(res.data.admin_user_id);
      } catch (err) {
        console.error("Failed to fetch company details:", err);
      }
    };
    fetchCompanyDetails();
  }, []);

  useEffect(() => {
    if (!adminId) return;
    const fetchAdminDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get(`/api/profiles/me/${adminId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAdminData(res.data);
      } catch (err) {
        console.error("Failed to fetch admin details:", err);
      }
    };
    fetchAdminDetails();
  }, [adminId]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get(
          `/api/company/${companyid}/getalljob`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setCompanyJobs(res.data.jobs || []);
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
      }
    };
    if (companyData?.id) fetchJobs();
  }, [companyData]);

  useEffect(() => {
    const fetchCompanyPosts = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get(`/api/company/${companyid}/updates`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPosts(res.data);
      } catch (error) {
        console.error("Error fetching company posts:", error);
      }
    };
    fetchCompanyPosts();
  }, []);

  if (!companyData) return <p>Loading company data...</p>;

  return (
    <div className="bg-[#f3f3ef] min-h-screen pb-10 px-4 lg:px-16">
      <Card className="relative z-10 rounded-lg shadow-lg bg-white overflow-hidden">
        <CardHeader floated={false} shadow={false} className="relative h-40 rounded-b-none">
          <img
            src={companyData.cover_photo_url || "/default-cover.jpg"}
            alt="Company Cover"
            className="w-full h-full object-cover"
          />
        </CardHeader>

        <div className="absolute top-28 left-[20%] transform -translate-x-1/2">
          <Avatar
            src={companyData.logo_url || "/default-avatar.png"}
            size="xxl"
            className="border-4 border-white shadow-lg"
          />
        </div>

        <CardBody className="pt-16">
          <div className="flex flex-col gap-2">
            <Typography variant="h4" className="font-semibold text-black">
              {companyData.name}
            </Typography>
            <Typography variant="small" className="text-gray-600">
              {companyData.industry} · {companyData.follower_count} followers · {companyData.size}
            </Typography>
            <Typography variant="small" className="text-gray-500">
              {companyData.website || "N/A"}
            </Typography>
          </div>
          <div className="flex gap-3 mt-4">
            <ConnectButton />
            <Button variant="outlined" className="rounded-full" color="blue">
              Message
            </Button>
          </div>

          <Tabs value={activeTab} className="mt-8 border-t border-gray-200 pt-2">
            <TabsHeader className="bg-transparent flex gap-6 border-b border-gray-200">
              {["home", "about", "posts", "jobs", "people"].map((tab) => (
                <Tab
                  key={tab}
                  value={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`text-sm font-medium capitalize px-2 py-1 focus:outline-none ${
                    activeTab === tab ? "text-blue-800 border-b-2 border-blue-800" : "text-gray-800"
                  }`}
                >
                  {tab}
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
        </CardBody>
      </Card>

      <div className="mt-4 max-w-5xl mx-auto">
        {activeTab === "home" && (
          <Card className="p-6 bg-white shadow-sm">
            <Typography className="text-sm text-gray-700">
              Welcome to our company page!
            </Typography>
          </Card>
        )}

        {activeTab === "about" && (
          <Card className="p-6 bg-white shadow-sm">
            <Typography variant="h6" className="mb-4">Overview</Typography>
            <div className="space-y-2">
              <div>
                <Typography className="font-semibold">Website</Typography>
                <Typography className="text-gray-600">
                  {companyData.website || "N/A"}
                </Typography>
              </div>
              <div>
                <Typography className="font-semibold">Industry</Typography>
                <Typography className="text-gray-600">
                  {companyData.industry}
                </Typography>
              </div>
              <div>
                <Typography className="font-semibold">Company size</Typography>
                <Typography className="text-gray-600">
                  {companyData.size}
                </Typography>
              </div>
            </div>
          </Card>
        )}

        {activeTab === "posts" && (
          <Card className="p-6 bg-white shadow-sm">
            <Typography variant="h6" className="mb-4">Page posts</Typography>
            {posts.length === 0 ? (
              <p className="text-center text-gray-500 mt-4">No posts yet.</p>
            ) : (
              <>
                {posts.map((post) => (
                  <CompanyPostsDetails
                    key={post.id}
                    post={post}
                    companyLogo={companyData.logo_url}
                  />
                ))}
                <div className="text-center mt-4">
                  <Button variant="text" className="text-sm text-blue-700 font-medium">
                    Show all posts →
                  </Button>
                </div>
              </>
            )}
          </Card>
        )}

        {activeTab === "jobs" && <CompanyJobsTab jobs={companyJobs} />}

        {activeTab === "people" && (
          <Card className="p-6 bg-white shadow-sm">
            <Typography variant="h6" className="mb-4">Team Members</Typography>
            <div className="flex items-center gap-4">
              <Avatar
                src={AdminData?.profile?.profilePictureUrl || "/default-avatar.png"}
                size="xl"
                className="border border-gray-300 shadow"
              />
              <div>
                <Typography className="font-medium text-lg">
                  {AdminData?.profile?.firstName} {AdminData?.profile?.lastName}
                </Typography>
                <Typography className="text-gray-600 text-sm">
                  {AdminData?.profile?.bio || "No headline available"}
                </Typography>
                <Typography className="text-gray-500 text-sm">
                  {AdminData?.profile?.location || ""}
                </Typography>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ViewCompany;
