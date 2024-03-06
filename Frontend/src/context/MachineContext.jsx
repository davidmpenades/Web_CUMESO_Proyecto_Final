import React, { createContext, useState, useEffect } from 'react';
import MachineService from '../services/MachineService';

const Context = React.createContext({});

export const MachineContextProvider = ({ children }) => {
  const [machines, setMachines] = useState([]);

  useEffect(() => {
    MachineService.getAll()
      .then((data) => {       
        setMachines(data.data); 
      })
      .catch((error) => {
        console.error(error);
      });
  }, []); 

  return (
    <Context.Provider value={{ machines, setMachines }}>
      {children}
    </Context.Provider>
  );
};

export default Context;
