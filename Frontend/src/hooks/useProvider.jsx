import { useContext, useCallback, useEffect } from "react";
import ProviderService from "../services/ProviderService";
import ProviderContext from "../context/ProviderContext";

const useProvider = () => {
    const { providers, setProviders } = useContext(ProviderContext);
    
    const fetchProviders = useCallback(() => {
        ProviderService.getAll()
        .then((data) => {
            setProviders(data.data);
        })
        .catch((error) => {
            console.error(error);
        });
    }, [setProviders]);
    
    useEffect(() => {
        fetchProviders();
    }, [fetchProviders]);
    
    return {
        providers,
        fetchProviders,
    };
    }

    export default useProvider;