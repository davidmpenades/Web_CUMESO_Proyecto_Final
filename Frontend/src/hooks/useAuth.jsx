import React, { useEffect, useState, useContext, useCallback } from "react";
import AuthService from "../services/AuthService";
import AuthContext from "../context/AuthContext";
import JwtService from "../services/JWTService";
import { useNavigate } from "react-router-dom";
import ProfileContext from "../context/ProfileContext";
import { toast } from "sonner";

export function useAuth() {
  const { user, setUser, setToken, isAdmin, setIsAdmin, isAuth, setIsAuth } =
    useContext(AuthContext);
    const { setProfile } = useContext(ProfileContext);
  const [isCorrect, setIsCorrect] = useState(false);
  const [errorMSG, setErrorMSG] = useState("");
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const useLogin = useCallback(
    (data) => {
      AuthService.Login(data)
        .then(({ data, status }) => {
          if (status === 200) {
            JwtService.saveToken(data.token);            
            setToken(data.token);
            setUser(data.user);
            setProfile(data.user);
            setIsAuth(true);
            setIsAdmin(data.user.type === "admin");
            setIsCorrect(true);
            setErrorMSG("");
            toast.success("Iniciando sesión, redirigiendo...", {
              duration: 1500,
            });            
            setTimeout(() => {
              setIsCorrect(false);
              if (data.user.type === "admin") {
                navigate("/dashboard");
              } else {
                navigate("/");
              }
            }, 1500);
          }
        })
        .catch((e) => {
          console.error(e);
          setErrorMSG(e.response.data[0]);
          toast.error("Error en el inicio de sesión: " + e.response.data[0], {
            duration: 1500,
          });
        });
    },
    [setUser, navigate]
  );

  const useRegister = useCallback(
    (data) => {
      console.log(data);
      AuthService.Register(data)
        .then(({ data, status }) => {
          console.log(data, status);
          if (status === 200) {
            JwtService.saveToken(data.token);
            setToken(data.token);
            setUser(data.user);
            setIsAuth(true);
            setIsAdmin(data.user.type === "admin");
            setIsCorrect(true);
            setErrorMSG("");
            toast.success("Registrado con éxito, redirigiendo...", {
              duration: 1500,
            });
            setTimeout(() => {
              setIsCorrect(false);
              navigate("/");
            }, 1500);
          }
        })
        .catch((e) => {
          console.error(e);
          setErrorMSG(e.response.data[0]);
          toast.error("Error en el registro: " + e.response.data[0], {
            duration: 1500,
          });
        });
    },
    [setUser, navigate]
  );

  return {    
    useLogin,
    useRegister,
    user,
    setUser,
    users,
    errorMSG,
    isCorrect,
  };
}
