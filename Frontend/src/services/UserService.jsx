import api from './api';

const UserService = {
    getAll() {
        return api().get('/users/');
    },
    deleteUser(uuid) {
        console.log(uuid);
        return api().delete(`/user/${uuid}/`);
    },
    updateMachineUsers(userId, machineIds) {
        return api().patch(`/users/${userId}/assign-machines/`, { machines: machineIds });
    }    
};

export default UserService; 