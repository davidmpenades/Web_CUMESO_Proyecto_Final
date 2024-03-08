import { useContext, useCallback, useEffect } from "react";
import DataService from "../services/DataService";

const useDataImage = () => {
    const fetchImage = useCallback((url) => {
        DataService.getImage(url)
        .then((data) => {
            return data.data;
        })
        .catch((error) => {
            console.error(error);
        });
    }, []);

    useEffect(() => {
        fetchImage();
    }, [fetchImage]);

    return {
        fetchImage,
    };
}

export default useDataImage;
