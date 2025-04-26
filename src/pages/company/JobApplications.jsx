import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, Typography, Button, Avatar } from '@material-tailwind/react';

const JobApplications = () => {
  const { jobid } = useParams();
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [profiles, setProfiles] = useState({});
  const token = localStorage.getItem("token");

  const fetchApplications = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/jobs/${jobid}/applications`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const apps = res.data.applications || [];
      setApplications(apps);

      // Fetch each applicant's profile
      const profileData = {};
      for (const app of apps) {
        try {
          const profileRes = await axios.get(
            `http://localhost:5000/api/profiles/me/${app.applicant_id}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          profileData[app.applicant_id] = profileRes.data?.profile || {};
        } catch (err) {
          console.error(`Failed to fetch profile for ${app.applicant_id}`, err);
        }
      }
      setProfiles(profileData);
    } catch (err) {
      console.error("Failed to fetch applications:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [jobid]);

  const handleAccept = async (appId) => {
    try {
      await axios.put(
        `http://localhost:5000/api/jobs/${appId}/accept`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await fetchApplications();
    } catch (err) {
      console.error("Failed to accept application:", err);
      alert("Failed to accept application.");
    }
  };

  const handleReject = async (appId) => {
    try {
      await axios.put(
        `http://localhost:5000/api/jobs/${appId}/reject`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await fetchApplications();
    } catch (err) {
      console.error("Failed to reject application:", err);
      alert("Failed to reject application.");
    }
  };

  if (loading) {
    return <Typography className="text-center mt-10">Loading applications...</Typography>;
  }

  return (
    <div className="flex flex-col items-center justify-center w-full mt-10">
      <Card className="w-[80%] p-6">
        <Typography variant="h4" className="mb-6">Applications for this Job</Typography>

        {applications.length === 0 ? (
          <Typography color="gray" className="text-center">No applications yet.</Typography>
        ) : (
          <div className="flex flex-col gap-6">
            {applications.map((app) => {
              const profile = profiles[app.applicant_id];
              return (
                <Card key={app.id} className="p-4 shadow-sm">
                  {/* Clickable user profile block */}
                  <div
                    className="flex items-center gap-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md"
                    onClick={() => navigate(`/view/${app.applicant_id}`)}
                  >
                    <Avatar src={profile?.profilePictureUrl || "/default-avatar.png"} alt="pfp" />
                    <div>
                      <Typography variant="h6">{profile?.userName || "Unknown User"}</Typography>
                      <Typography variant="small" color="gray">
                        {profile?.bio || "No bio available"}
                      </Typography>
                      <Typography variant="small" color="gray">
                        {profile?.location || "No location"}
                      </Typography>
                    </div>
                  </div>

                  {/* Application details */}
                  <div className="mt-3">
                    <Typography variant="h6">{app.first_name} {app.last_name}</Typography>
                    <Typography color="gray">{app.email} · {app.phone_number}</Typography>
                    <Typography color="gray">{app.country}, {app.address}</Typography>
                    <Typography color="blue-gray" className="text-sm mt-2">
                      Status: {app.status}
                    </Typography>
                    {app.cover_letter && (
                      <Typography className="text-sm mt-2">Cover Letter: {app.cover_letter}</Typography>
                    )}
                    <div className="flex gap-4 mt-4">
                      <Button
                        color="green"
                        onClick={() => handleAccept(app.id)}
                        disabled={app.status === "accepted"}
                      >
                        Accept
                      </Button>
                      <Button
                        color="red"
                        onClick={() => handleReject(app.id)}
                        disabled={app.status === "rejected"}
                      >
                        Reject
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
};

export default JobApplications;
