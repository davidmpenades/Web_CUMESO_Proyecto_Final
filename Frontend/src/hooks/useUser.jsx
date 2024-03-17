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

    const deleteUser = useCallback(async (uuid) => {
        console.log(uuid);
        try {
            await UserService.deleteUser(uuid);
            setUsers(users.filter(user => user.uuid !== uuid));
        } catch (error) {
            console.error('Error eliminando usuario:', error);
        }
    }, [users, setUsers]);

    
    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);
    
    return {
        users,
        fetchUsers,
        deleteUser
    };
    }

    export default useUser;