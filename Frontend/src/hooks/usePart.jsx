import { useContext, useCallback, useEffect } from "react";
import PartService from "../services/PartService";
import PartContext from "../context/PartContext";
import { toast } from "sonner";

const usePart = () => {
    const { parts, setParts } = useContext(PartContext);
    
    const fetchParts = useCallback(() => {
        PartService.getAll()
        .then((data) => {
            setParts(data.data);
        })
        .catch((error) => {
            console.error(error);
        });
    }, [setParts]);

    const deletePart = useCallback((slug) => {
        PartService.delete(slug)
        .then(() => {
            setParts(prevParts => prevParts.filter(part => part.slug !== slug));
        })
        .catch((error) => {
            console.error(error);
            alert("Hubo un error al borrar la pieza.");
        });
    }, [setParts]);
    
    const createPart = useCallback(async (formData) => {
        try {
            const response = await PartService.create(formData);
            setParts(prevParts => [...prevParts, response.data]);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }, [setParts]);

    const getPartImage = async (slug) => {
        try {
            const response = await PartService.getImage(slug);
            return response.data; 
        } catch (error) {
            console.error("Error al obtener la imagen de la parte: ", error);
        }
    };

    const updatePart = useCallback(async (slug, formData) => {
        try {
            await PartService.update(slug, formData);
            fetchParts();
            toast.success("Parte actualizada correctamente");
            return true;
        } catch (error) {
            toast.error("Error al actualizar la parte");
            console.error(error);
            return false;
        }
    }, [fetchParts]);

    useEffect(() => {
        fetchParts();
    }, [fetchParts]);
    
    return {
        parts,
        fetchParts,
        deletePart,
        createPart,
        getPartImage,
        updatePart,
    };
    }

    export default usePart;