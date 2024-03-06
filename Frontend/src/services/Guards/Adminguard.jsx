import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import  AuthContext  from "../../context/AuthContext";

const AdminGuard = () => {
    const { isAdmin } = useContext(AuthContext);

    return isAdmin ? <Outlet /> : <Navigate to="/"/>;
}

export default AdminGuard;
