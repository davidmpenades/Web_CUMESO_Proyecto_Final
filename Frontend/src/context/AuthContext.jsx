import React, { useEffect, useState, useCallback, createContext, useContext } from "react";
import AuthService from "../services/AuthService";
import JwtService from "../services/JWTService";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from 'sonner'

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState([]);
  const [token, setToken] = useState(
    JwtService.getToken ? JwtService.getToken : false
  );
  const [isAuth, setIsAuth] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const notifyLogout = () => toast.warning("has salido de tu cuenta!");

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
          if (JwtService.getRefreshToken()) {
            refresh_token();
          } else {
            setTimeout(() => {logout()}, 1500);
          }
        });
    }
  }, []);

  const refresh_token = async () => {
    JwtService.destroyToken();
    await AuthService.refreshToken()
      .then(({ data }) => {
        setToken(data.token);
        JwtService.saveToken(data.token);
        // navigate("/");
      })
      .catch(({}) => {
        logout();
      });
  };

  const logout = useCallback(() => {
    console.log('logout');
    JwtService.destroyToken();
    JwtService.destroyRefreshToken();
    setUser({});
    setToken(false);
    setIsAuth(false);
    setIsAdmin(false);
    notifyLogout();
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
