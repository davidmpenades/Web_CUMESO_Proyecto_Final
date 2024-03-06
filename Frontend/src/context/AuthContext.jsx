import React, { useEffect, useState, useCallback, createContext, useContext } from "react";
import AuthService from "../services/AuthService";
import JwtService from "../services/JWTService";
import { useNavigate } from "react-router-dom";
import { toast } from 'sonner'

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState([]);
  const [token, setToken] = useState(
    JwtService.getToken ? JwtService.getToken : false
  );
  const [isAuth, setIsAuth] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      AuthService.getUser()
        .then(({ data, status }) => {
          if (status === 200) {
            setToken(data.token);
            setUser(data.user);
            setIsAuth(true);
            setIsAdmin(data.user.type === "admin");
            // navigate("/");
          }
        })
        .catch(({ error }) => {
          console.error(error);          
            setTimeout(() => {logout()}, 1500);          
        });
    }
  }, []);


  const logout = useCallback(() => {
    console.log('logout');
    JwtService.destroyToken();
    setUser({});
    setToken(false);
    setIsAuth(false);
    setIsAdmin(false);
    toast.warning("has salido de tu cuenta!")
    navigate('');
}, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        isAuth,
        setIsAuth,
        isAdmin,
        setIsAdmin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
