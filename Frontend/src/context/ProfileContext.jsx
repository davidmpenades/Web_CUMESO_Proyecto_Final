import React, { useEffect, useState, createContext } from "react";
import ProfileService from "../services/ProfileService";
const ProfileContext = createContext();

export function ProfileContextProvider({ children }) {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = () => {
    ProfileService.getProfile()
      .then(({ data, status }) => {
        if (status === 200) {
          setProfile(data);
        }
      })
      .catch(({ error }) => {
        console.error(error);
      });
  };
  return (
    <ProfileContext.Provider value={{ profile, setProfile, getProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}

export default ProfileContext;
