import React, { useState, useEffect, useContext } from "react";
import UserService from "../services/UserService";
import JwtService from "../services/JWTService";
import AuthContext from "./AuthContext";

const Context = React.createContext({});

export const UserContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [token] = useState(
    JwtService.getToken ? JwtService.getToken : false
  );
  const { isAdmin } = useContext(AuthContext);

  useEffect(() => {
    if (token && isAdmin) {
      UserService.getAll()
        .then((data) => {
          setUsers(data.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  return (
    <Context.Provider value={{ users, setUsers }}>
      {children}
    </Context.Provider>
  );
};

export default Context;