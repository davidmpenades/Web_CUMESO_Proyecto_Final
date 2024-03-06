import React, { useContext } from "react";
import  AuthContext  from "../../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const AuthGuard = () => {
    const { isAuth } = useContext(AuthContext);

    return isAuth ? <Outlet /> : <Navigate to="/" />;
}

export default AuthGuard;