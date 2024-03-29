import React, { useState, useEffect, useContext } from "react";
import PartService from "../services/PartService";
import JwtService from "../services/JWTService";
import AuthContext from "./AuthContext";

const Context = React.createContext({});

export const PartContextProvider = ({ children }) => {
  const [parts, setParts] = useState([]);
  const [token, setToken] = useState(
    JwtService.getToken ? JwtService.getToken : false
  );
  const { isAdmin } = useContext(AuthContext);
  useEffect(() => {
    if (token && isAdmin) {
      PartService.getAll()
        .then((data) => {
          setParts(data.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  return (
    <Context.Provider value={{ parts, setParts }}>{children}</Context.Provider>
  );
};

export default Context;
