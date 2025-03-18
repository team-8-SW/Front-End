import { useState } from "react";

export default function EducationForm() {
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldOfStudy: "",
    startDate: "",
    endDate: "",
    grade: "",
    activities: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="relative h-screen w-full flex items-center justify-center bg-gray-100">
      {/* Blurred Background */}
      <div className="absolute inset-0 bg-gray-900 opacity-50 backdrop-blur-md"></div>

      {/* Floating Form */}
      <div className="relative z-50 bg-white p-6 rounded-lg shadow-xl w-1/2">
        <h2 className="text-xl font-semibold mb-4">Add Education</h2>
        
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">School*</label>
            <input
              type="text"
              name="school"
              value={formData.school}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-300"
              placeholder="Ex: Boston University"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Degree</label>
            <input
              type="text"
              name="degree"
              value={formData.degree}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-300"
              placeholder="Ex: Bachelor's"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Field of Study</label>
            <input
              type="text"
              name="fieldOfStudy"
              value={formData.fieldOfStudy}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-300"
              placeholder="Ex: Business"
            />
          </div>

          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">Start Date</label>
              <input
                type="month"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-300"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">End Date (or expected)</label>
              <input
                type="month"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-300"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Grade</label>
            <input
              type="text"
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Activities and Societies</label>
            <input
              type="text"
              name="activities"
              value={formData.activities}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-300"
              placeholder="Ex: Alpha Phi Omega, Marching Band, Volleyball"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-300 h-20"
              placeholder="Describe your experience"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}