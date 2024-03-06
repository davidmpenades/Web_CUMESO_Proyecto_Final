import React, {useState, useEffect} from 'react'
import PartService from "../services/PartService";

const Context = React.createContext({});

export const PartContextProvider = ({ children }) => {
  const [parts, setParts] = useState([]);

  useEffect(() => {
    PartService.getAll()
      .then((data) => {
        setParts(data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Context.Provider value={{ parts, setParts }}>{children}</Context.Provider>
  );
};

export default Context;