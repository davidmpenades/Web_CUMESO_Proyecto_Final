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

    const deleteProvider = useCallback((slug) => {
        ProviderService.delete(slug)
        .then(() => {
            setProviders(prevProviders => prevProviders.filter(provider => provider.slug !== slug));
        })
        .catch((error) => {
            console.error(error);
            alert("Hubo un error al borrar la pieza.");
        });
    }, [setProviders]);
    
    useEffect(() => {
        fetchProviders();
    }, [fetchProviders]);
    
    return {
        providers,
        fetchProviders,
        deleteProvider
    };
    }

    export default useProvider;