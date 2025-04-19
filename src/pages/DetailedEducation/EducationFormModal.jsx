import { useState } from "react";
import axios from "axios";
import { Typography, Button, Input, Select, Option } from "@material-tailwind/react";

// Schools list - same used in backend validation
export const schoolsList = [
  "Cairo University",
  "Stanford University",
  "Massachusetts Institute of Technology",
  "Harvard University",
  "University of Oxford",
  "ETH Zurich",
  "University of Tokyo",
  "National University of Singapore",
  "University of Cambridge",
  "Imperial College London",
];

const EducationFormModal = ({ onClose, onSave }) => {
  const [education, setEducation] = useState({
    school: "",
    degree: "",
    major: "",
    from: "",
    to: ""
  });

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");

    if (!education.school || !education.degree || !education.from) {
      alert("School, degree, and start year are required.");
      return;
    }

    const matchedSchool = schoolsList.find(
      (s) => s.toLowerCase() === education.school.toLowerCase()
    ) || education.school;

    const startDate = new Date(education.from.toString()).toISOString().split("T")[0];
    let endDate = null;
    if (education.to) {
      const toParsed = new Date(education.to.toString());
      if (toParsed < new Date(education.from)) {
        alert("End date must be after start date");
        return;
      }
      endDate = toParsed.toISOString().split("T")[0];
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/profiles/me/education",
        {
          school: matchedSchool,
          degree: education.degree,
          startDate,
          endDate,
          skills: [] // can be enhanced later
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data?.education) {
        onSave(res.data.education);
        onClose();
        window.location.reload(); // Refresh the page to reflect changes
      } else {
        alert("Unexpected server response.");
      }
    } catch (err) {
      console.error("Error submitting education:", err);
      alert(err.response?.data?.error || "Internal server error occurred.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="p-6 bg-white rounded-lg shadow-lg max-w-lg w-full">
        <Typography variant="h4" className="mb-4">Add Education</Typography>

        {/* School Dropdown */}
        <div className="mb-4">
          <Typography variant="small">School*</Typography>
          <Select
            label="Select School"
            value={education.school}
            onChange={(value) => setEducation({ ...education, school: value })}
          >
            {schoolsList.map((school, index) => (
              <Option key={index} value={school}>{school}</Option>
            ))}
          </Select>
        </div>

        <Input
          label="Degree"
          value={education.degree}
          onChange={(e) => setEducation({ ...education, degree: e.target.value })}
          className="mb-4"
        />

        <Input
          label="Major"
          value={education.major}
          onChange={(e) => setEducation({ ...education, major: e.target.value })}
          className="mb-4"
        />

        <div className="flex gap-4 mb-4">
          <Input
            label="From"
            type="number"
            value={education.from}
            onChange={(e) => setEducation({ ...education, from: e.target.value })}
          />
          <Input
            label="To"
            type="number"
            value={education.to}
            onChange={(e) => setEducation({ ...education, to: e.target.value })}
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="text" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </div>
      </div>
    </div>
  );
};

export default EducationFormModal;
