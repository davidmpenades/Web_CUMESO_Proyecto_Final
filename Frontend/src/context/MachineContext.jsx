import React, { useState, useEffect, useContext } from "react";
import MachineService from "../services/MachineService";
import JwtService from "../services/JWTService";
import AuthService from "../services/AuthService";
import AuthContext from "./AuthContext";

const Context = React.createContext({});

export const MachineContextProvider = ({ children }) => {
  const [machines, setMachines] = useState([]);
  const [token, setToken] = useState(
    JwtService.getToken ? JwtService.getToken : false
  );
  const { isAdmin } = useContext(AuthContext);

  useEffect(() => {
    // if (token && isAdmin) {
      MachineService.getAll()
        .then((data) => {
          setMachines(data.data);
        })
        .catch((error) => {
          console.error(error);
        });
    // }
  }, []);

  return (
    <Context.Provider value={{ machines, setMachines }}>
      {children}
    </Context.Provider>
  );
};

export default Context;
