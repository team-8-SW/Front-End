// EduData.jsx
import { Typography } from "@material-tailwind/react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { handleDeleteEdu } from "../../services/profile";

// School logos
export const schoolsList = [
  { name: "Cairo University", logo: "" },
  { name: "Stanford University", logo: "" },
  { name: "Massachusetts Institute of Technology", logo: "" },
  { name: "Harvard University", logo: "" },
  { name: "University of Oxford", logo: "" },
  { name: "ETH Zurich", logo: "" },
  { name: "University of Tokyo", logo: "" },
  { name: "National University of Singapore", logo: "" },
  { name: "University of Cambridge", logo: "" },
  { name: "Imperial College London", logo: "" },
  { name: "Other", logo: "" }
];

const EduData = ({ edu, onDelete }) => {
  console.log("EduData", edu);
  const handleDelete = () => {
    handleDeleteEdu(edu, onDelete);
    window.location.reload();
  };

  const schoolData = schoolsList.find((s) => s.name === edu.school);
  const formatDate = (isoDate) => {
    if (!isoDate) return "Present";
    const date = new Date(isoDate);
    return date.getFullYear();
  };

  return (
    <div className="flex justify-between items-center border-b border-gray-200 py-2">
      <div className="flex gap-5">
        {schoolData?.logo ? (
          <img src={schoolData.logo} alt={edu.school} className="w-10 h-10" />
        ) : (
          <div className="w-10 h-10 border border-gray-300 flex items-center justify-center rounded-sm">
            🎓
          </div>
        )}
        <div>
          <Typography variant="h3" className="font-medium text-gray-800">
            {edu.universityName || "N/A"}
          </Typography>
          <Typography variant="small" className="font-medium text-gray-800">
            {edu.degree || "N/A"} 
          </Typography>
          <Typography variant="small" className="text-gray-600">
            {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
          </Typography>
        </div>
      </div>

      <div className="flex gap-2">
        <button className="text-gray-600 hover:text-gray-800">
          <PencilIcon className="w-5 h-5" />
        </button>
        <button className="text-red-500 hover:text-red-700" onClick={handleDelete}>
          <TrashIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default EduData;
