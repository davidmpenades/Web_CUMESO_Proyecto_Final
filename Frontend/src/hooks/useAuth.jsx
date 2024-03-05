import React, { useEffect, useState, useContext, useCallback } from "react";
import AuthService from "../services/AuthService";
import AuthContext from "../context/AuthContext";
import JwtService from "../services/JWTService";
import { useNavigate } from "react-router-dom";
import {toast } from 'sonner'

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

  const useLogin = useCallback((data) => {
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
          toast.success("Iniciando sesión, redirigiendo...",{duration:1500}); 
          setTimeout(() => {
            setIsCorrect(false);
            Navigate("/");
          }, 1500);
        }
      })
      .catch((e) => {
        console.error(e);
        setErrorMSG(e.response.data[0]);
        toast.error("Error en el inicio de sesión: " + e.response.data[0],{duration:1500}); 
      });
  }, [setUser, Navigate]);
  
  const useRegister = useCallback((data) => {
    AuthService.Register(data)
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
          toast.success("Registrado con éxito, redirigiendo...",{duration:1500}); 
          setTimeout(() => {
            setIsCorrect(false);
            Navigate("/");
          }, 1500);
        }
      })
      .catch((e) => {
        console.error(e);
        setErrorMSG(e.response.data[0]);
        toast.error("Error en el registro: " + e.response.data[0],{duration:1500});
      });
  }, [setUser, Navigate]);
  
  return { useAuth, useLogin, useRegister, user, setUser,users, errorMSG, isCorrect };
}
