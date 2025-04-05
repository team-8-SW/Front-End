import React from 'react';
import HomeProfileCard from '../home/HomeProfileCard';


const Notifications = () => {
    return (
    <div>
      <div className="flex justify-center space-x-12 mr-4">
        <div className="w-1/5 ml-4 mt-4">
          <HomeProfileCard />
        </div>
        <div className="w-3/5">
          <div className="mt-4">
          </div>
        </div>
        <div className="w-1/5"></div>
      </div>
    </div>
    );
  };
  
  export default Notifications;