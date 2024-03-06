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
    
    useEffect(() => {
        fetchParts();
    }, [fetchParts]);
    
    return {
        parts,
        fetchParts,
    };
    }

    export default usePart;