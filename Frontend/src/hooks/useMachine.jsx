import { useCallback, useContext, useEffect, useState } from "react";
import MachineService from "../services/MachineService";
import MachineContext from "../context/MachineContext";

const useMachine = () => {
  const { machines, setMachines } = useContext(MachineContext);

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
        // Actualizar el estado para reflejar la máquina borrada
        setMachines(prevMachines => prevMachines.filter(machine => machine.slug !== slug));  
      })
      .catch((e) => {
        console.error(e);
        alert("Hubo un error al borrar la máquina.");
      });
  }, [setMachines]);

  useEffect(() => {
    fetchMachines();
  }, [fetchMachines]);

  return {
    machines,
    fetchMachines,
    getMachineImage,
    updateMachineVisibility, 
    deleteMachine
  };
};

export default useMachine;
