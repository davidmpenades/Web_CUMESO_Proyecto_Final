import { useContext, useCallback, useEffect } from "react";
import ProviderService from "../services/ProviderService";
import ProviderContext from "../context/ProviderContext";
import { toast } from "sonner";

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

    const createProvider = useCallback(async (formData) => {
        try {
            const response = await ProviderService.create(formData);
            setProviders(prevProviders => [...prevProviders, response.data]);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }, [setProviders]);

    const updateProvider = useCallback(async (slug, formData) => {
        try {
            await ProviderService.update(slug, formData);
            fetchProviders();
            toast.success("Proveedor actualizado correctamente");
            return true;
        } catch (error) {
            toast.error("Error al actualizar el proveedor");
            console.error(error);
            return false;
        }
    }, []);
    
    useEffect(() => {
        fetchProviders();
    }, [fetchProviders]);
    
    return {
        providers,
        fetchProviders,
        deleteProvider,
        createProvider,
        updateProvider,
    };
    }

    export default useProvider;