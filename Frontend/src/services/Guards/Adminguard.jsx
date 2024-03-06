import React, { useContext, useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import  AuthContext  from "../../context/AuthContext";
import { useAuth } from "../../hooks/useAuth";
import AuthService from "../AuthService";

function AdminGuard() {
    const [print, setPrint] = useState(<Navigate to="/" />);
    const { isAdmin } = useContext(AuthContext);
    const { logout } = useAuth();

    const [bol, setBol] = useState(false);

    useEffect(() => {
        AuthService.getUser()
            .then(({ data, status }) => {
                
                if (status === 200) {
                    if (data.user.type === 'admin') {
                        setPrint(<Outlet />);
                    } else {
                        setPrint(<Navigate to="/" />);
                    }
                }
                setBol(true);
            })
            .catch((err) => {
                logout()
                setPrint(<Navigate to="/login" />);
            });
    }, [isAdmin]);

    if (bol) {
        return print;
    }
}

export default AdminGuard;
