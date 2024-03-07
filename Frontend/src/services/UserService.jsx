import api from './api';

const UserService = {
    getAll() {
        return api().get('/users/');
    }
};

export default UserService;