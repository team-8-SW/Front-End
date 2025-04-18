import React, { useEffect, useState } from "react";
import { Card, Typography } from "@material-tailwind/react";
import EduData3 from "./EduData3";

const ViewEdu = ({ education }) => {
  const [educations, setEducations] = useState(education || []);

  useEffect(() => {
    setEducations(education || []);
  }, [education]);

  return (
    <div className="flex justify-center mt-6">
      <Card className="border border-gray-300 shadow-sm rounded-lg p-4 w-full bg-white">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Typography variant="h6" className="font-semibold text-gray-900">
            Education
          </Typography>
        </div>

        {/* Entries */}
        <div>
          {educations.length > 0 ? (
            educations.map((edu, index) => (
              <div key={index}>
                <EduData3 edu={edu} />
                {index !== educations.length - 1 && (
                  <hr className="my-4 border-t border-gray-200" />
                )}
              </div>
            ))
          ) : (
            <Typography color="gray">No Education Added</Typography>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ViewEdu;
