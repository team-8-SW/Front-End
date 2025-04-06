import React from "react";
import SideLeftBar from "./SideLeftBar";

const NetworkPage = () => {
return(
   
    <div className="flex">
            <div className="w-1/4 border-r"> 
                <SideLeftBar />
            </div>
            <div className="w-3/4 p-4"> 
            {/* Main content area */}
               
            </div>
        </div>
    );
};
export default NetworkPage;