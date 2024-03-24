import { useContext, useCallback, useEffect } from "react";
import UserService from "../services/UserService";
import UserContext from "../context/UserContext";
import { toast } from "sonner";

const useUser = () => {
  const { users, setUsers } = useContext(UserContext);

  const fetchUsers = useCallback(() => {
    console.log("fetching users");
    UserService.getAll()
      .then((data) => {        
        setUsers(data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [setUsers]);

  const deleteUser = useCallback(
    async (uuid) => {
      console.log(uuid);
      try {
        await UserService.deleteUser(uuid);
        setUsers(users.filter((user) => user.uuid !== uuid));
        toast.success("Usuario eliminado.");
      } catch (error) {
        toast.error("Error eliminando usuario.");
        console.error("Error eliminando usuario:", error);
      }
    },
    [users, setUsers]
  );

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    fetchUsers,
    deleteUser,
  };
};

export default useUser;
