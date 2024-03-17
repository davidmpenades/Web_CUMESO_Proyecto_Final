import { useCallback, useContext, useEffect, useState } from "react";
import MachineService from "../services/MachineService";
import MachineContext from "../context/MachineContext";
import {toast} from "sonner"
import { useNavigate } from "react-router-dom";

const useMachine = () => {
  const { machines, setMachines } = useContext(MachineContext);
  const navigate = useNavigate(); 

  const updateMachineVisibility = useCallback((slug, newVisibility) => {
    MachineService.updateVisibility(slug, newVisibility)
      .then((data) => {
        setMachines(prevMachines => prevMachines.map(machine => 
          machine.slug === slug ? { ...machine, visibility: newVisibility.visibility } : machine
        ));  
        fetchMachines();
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const fetchMachines = useCallback(() => {
    MachineService.getAll()
      .then((data) => {
        setMachines(data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const getMachineImage = async (slug) => {
    try {
      const data = await MachineService.getImage(slug);
      return data.data;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const deleteMachine = useCallback((slug) => {
    MachineService.delete(slug)
      .then(() => {
        setMachines(prevMachines => prevMachines.filter(machine => machine.slug !== slug));  
      })
      .catch((e) => {
        console.error(e);
        alert("Hubo un error al borrar la máquina.");
      });
  }, [setMachines]);

  const createMachine = useCallback(async (formData) => {
    try {
      const response = await MachineService.create(formData);
      setMachines(prevMachines => [...prevMachines, response.data]);
      toast.success("Máquina creada correctamente");
      return true; 
    } catch (error) {
      console.error(error);
      toast.error("Error al crear la máquina");
      return false; 
    }
  }, [setMachines]);

  useEffect(() => {
    fetchMachines();
  }, [fetchMachines]);

  return {
    machines,
    fetchMachines,
    getMachineImage,
    updateMachineVisibility, 
    deleteMachine,
    createMachine,
  };
};

export default useMachine;
