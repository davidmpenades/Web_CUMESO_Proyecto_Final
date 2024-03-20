import { useContext, useCallback, useEffect } from "react";
import PartService from "../services/PartService";
import PartContext from "../context/PartContext";

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

    useEffect(() => {
        fetchParts();
    }, [fetchParts]);
    
    return {
        parts,
        fetchParts,
        deletePart,
        createPart,
    };
    }

    export default usePart;