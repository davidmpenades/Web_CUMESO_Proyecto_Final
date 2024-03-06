import { useCallback, useContext, useEffect, useState } from "react";
import MachineService from "../services/MachineService";
import MachineContext from "../context/MachineContext";

const useMachine = () => {
    const { machines, setMachines } = useContext(MachineContext);
    
    const fetchMachines = useCallback(() => {
        MachineService.getAll()
        .then((data) => {
            console.log(data.data);
            setMachines(data.data); 
        })
        .catch((e) => {
            console.log(e);
        });
    }, []);

   
    useEffect(() => {
        fetchMachines();
    }, [fetchMachines]);
    
    return {
        machines,
        fetchMachines, 
    };
}

export default useMachine;
