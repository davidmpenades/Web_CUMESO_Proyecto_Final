import { useContext, useCallback, useEffect } from "react";
import UserService from "../services/UserService";
import UserContext from "../context/UserContext";

const useUser = () => {
    const { users, setUsers } = useContext(UserContext);
    
    const fetchUsers = useCallback(() => {
        UserService.getAll()
        .then((data) => {
            setUsers(data.data);
        })
        .catch((error) => {
            console.error(error);
        });
    }, [setUsers]);
    
    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);
    
    return {
        users,
        fetchUsers,
    };
    }

    export default useUser;