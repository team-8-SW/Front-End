import React from "react";

const FollowerModal = ({ followers, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-start pt-20">
      <div className="bg-white w-full max-w-2xl rounded-lg p-6 shadow-lg relative max-h-[80vh] overflow-y-auto">
        <button
          className="absolute top-3 right-4 text-xl font-bold text-gray-600 hover:text-black"
          onClick={onClose}
        >
          ✕
        </button>
        <h2 className="text-lg font-semibold mb-4">All followers</h2>

        <div className="flex gap-2 mb-4">
          <button className="bg-[#004b3c] text-white text-xs px-3 py-1 rounded-full">People</button>
          <button className="text-gray-500 border px-3 py-1 text-xs rounded-full">Pages</button>
        </div>

        <div className="space-y-3">
          {followers.map((follower, index) => (
            <div key={index} className="flex flex-col border-b pb-2">
              <p className="font-semibold text-sm">{follower.full_name || "Unnamed User"}</p>
              <p className="text-xs text-gray-400">
                Followed on{" "}
                {new Date(follower.followed_at).toLocaleDateString("en-GB")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FollowerModal;
