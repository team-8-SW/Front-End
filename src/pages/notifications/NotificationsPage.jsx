import React from 'react';
import ProfileCard from '../home/ProfileCard'
import Nav from '../../components/Nav'
import Notifications from './Notifications';

const NotificationsPage = ({ loggedUser }) => {
  console.log("Logged User in NotificationsPage:", loggedUser); // Debugging
  return (
    <div>
      {/* <Nav /> */}
    <div className="flex justify-center space-x-12 mr-4">
      <div className="w-1/5 ml-4 mt-4">
        <ProfileCard loggedUser={loggedUser} />
      </div>
      <div className="w-3/5">
        <div className="mt-4">
          <Notifications loggedUser={loggedUser} />
        </div>
      </div>
      <div className="w-1/5"></div>
    </div>
    </div>
  );
};

export default NotificationsPage;