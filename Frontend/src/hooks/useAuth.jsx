import React, { useEffect, useState, useContext, useCallback } from "react";
import AuthService from "../services/AuthService";
import AuthContext from "../context/AuthContext";
import JwtService from "../services/JWTService";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from 'sonner'

export function useAuth() {
  const { user, setUser, setToken, isAdmin, setIsAdmin, isAuth, setIsAuth } =
    useContext(AuthContext);
  const [isCorrect, setIsCorrect] = useState(false);
  const [errorMSG, setErrorMSG] = useState("");
  const Navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    AuthService.getAllUsers()
      .then(({ data }) => {
        setUsers(data);
      })
      .catch((e) => console.error(e));
  }, []);

  const useLogin = useCallback(
    (data) => {
      AuthService.Login(data)
        .then(({ data, status }) => {
          if (status === 200) {
            JwtService.saveToken(data.token);
            JwtService.saveRefreshToken(data.ref_token);
            setToken(data.token);
            setUser(data.user);
            setIsAuth(true);
            setIsAdmin(data.user.type === "admin");
            setIsCorrect(true);
            setErrorMSG("");
            setTimeout(() => {
              setIsCorrect(false);
            }, 1000);
          }
        })
        .catch((e) => {
          console.log("error", e);
          setErrorMSG(e.response.data[0]);
        });
    },
    [setUser]
  );

  const useRegister = useCallback(
    (data) => {
      AuthService.Register(data)
        .then(({ data, status }) => {
          if (status == 200) {
            JwtService.saveToken(data.token);
            JwtService.saveRefreshToken(data.ref_token);
            setToken(data.token);
            setUser(data.user);
            setIsAuth(true);
            setIsAdmin(data.user.type === "admin");
            setIsCorrect(true);
            setErrorMSG("");
            setTimeout(() => {
              setIsCorrect(false);
            }, 1000);
            Navigate("/");
          }
        })
        .catch((e) => {
          console.error(e);
          setErrorMSG(e.response.data[0]);
          // toast.error(e.response.data[0]);
        });
    },
    [setUser]
  );
  return { useAuth, useLogin, useRegister, user, setUser,users, errorMSG, isCorrect };
}
