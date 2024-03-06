import React, { useState, useEffect, useContext } from "react";
import ProviderService from "../services/ProviderService";
import JwtService from "../services/JWTService";
import AuthContext from "./AuthContext";

const Context = React.createContext({});

export const ProviderContextProvider = ({ children }) => {
  const [providers, setProviders] = useState([]);
  const [token, setToken] = useState(
    JwtService.getToken ? JwtService.getToken : false
  );
  const { isAdmin } = useContext(AuthContext);

  useEffect(() => {
    if (token && isAdmin) {
      ProviderService.getAll()
        .then((data) => {
          setProviders(data.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  return (
    <Context.Provider value={{ providers, setProviders }}>
      {children}
    </Context.Provider>
  );
};

export default Context;
