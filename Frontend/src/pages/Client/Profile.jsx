import React, { useContext } from "react";
import ProfileContext from "../../context/ProfileContext";
const Profile = () => {
  const { profile } = useContext(ProfileContext);
  const baseURL = "http://localhost:8001";
  console.log(profile);
  return (
    <div className="p-16">
      <div className="p-8 bg-white shadow mt-24">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0"></div>
          <div className="relative">
            {/* Comprueba si profile.image existe antes de intentar mostrarlo */}
            {profile.image && (
              <img
                src={`${baseURL}${profile.image}`}
                alt="Profile"
                className="w-48 h-48 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24"
              />
            )}
          </div>

          <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
            <button className="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
              Connect
            </button>
          </div>
        </div>

        <div className="mt-20 text-center border-b pb-12">
          <h1 className="text-4xl font-medium text-gray-700">
            {profile.username}
          </h1>
          <p className="font-light text-gray-600 mt-3">{profile.company}</p>
        </div>

        <div className="mt-12 flex flex-col justify-center"></div>
      </div>
    </div>
  );
};

export default Profile;
