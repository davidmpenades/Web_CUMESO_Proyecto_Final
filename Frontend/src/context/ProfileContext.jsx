import React, {
  useEffect,
  useState,
  useCallback,
  createContext,
  useContext,
} from "react";
import ProfileService from "../services/ProfileService";
import AuthContext from "./AuthContext";
const ProfileContext = createContext();

export function ProfileContextProvider({ children }) {
  const [profile, setProfile] = useState([]);
  const { isAuth } = useContext(AuthContext);

  useEffect(() => {
    
      ProfileService.getProfile()
        .then(({ data, status }) => {
          if (status === 200) {
            setProfile(data);
          }
        })
        .catch(({ error }) => {
          console.error(error);
        });
    
  }, [profile.image]);

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}

export default ProfileContext;
