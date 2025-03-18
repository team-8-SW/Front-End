import React from 'react';
import { Card } from "@material-tailwind/react";

const SecondSide = () => {
  return (
    <div className="flex justify-center">
      <Card className="mt-6 w-96 overflow-hidden">
        <img 
          src="https://media.licdn.com/media/AAYABATPAAgAAQAAAAAAAKwYrfHUPkoBQGmwnaG71Ps_5Q.png" 
          alt="Descriptive text for the image"
          className="w-full h-full object-cover"
        />
      </Card>
    </div>
  );
}

export default SecondSide;
