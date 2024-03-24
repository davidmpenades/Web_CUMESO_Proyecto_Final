import { useCallback, useContext, useEffect, useState } from "react";
import MachineService from "../services/MachineService";
import MachineContext from "../context/MachineContext";
import {toast} from "sonner"

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

  const addPartToMachine = useCallback(async (machineSlug, partId) => {
    try {
      const response = await MachineService.addPartToMachine(machineSlug, partId); 
      setMachines((prev) => prev.map((machine) => machine.slug === machineSlug ? { ...machine, parts: [...machine.parts, partId] } : machine));
      toast.success("Pieza añadida a la máquina correctamente");
    } catch (error) {
      console.error("Error al añadir la pieza a la máquina:", error);
      toast.error("Error al añadir la pieza a la máquina");
    }
  }, [setMachines]);
  
  const updateMachine = useCallback(async (slug, formData) => {
    try {
      const response = await MachineService.updateMachine(slug, formData); 
      setMachines(prevMachines => prevMachines.map(machine => 
        machine.slug === slug ? response.data : machine
      ));  
      toast.success("Máquina actualizada correctamente");
      return true; 
    } catch (error) {
      console.error(error);
      toast.error("Error al actualizar la máquina");
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
    updateMachine,
    addPartToMachine,
  };
};

export default useMachine;
