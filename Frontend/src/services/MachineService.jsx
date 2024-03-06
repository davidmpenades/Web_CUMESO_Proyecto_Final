import api from './api';

const MachineService = {
    getAll() {
        return api().get('/machines/');
    }
};

export default MachineService;