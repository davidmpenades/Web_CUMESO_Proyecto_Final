import api from './api';

const UserService = {
    getAll() {
        return api().get('/users/');
    },
    deleteUser(uuid) {
        console.log(uuid);
        return api().delete(`/user/${uuid}/`);
    }
};

export default UserService;