import api from './api';

const PartService = {
    getAll() {
        return api().get('/parts/');
    }
};

export default PartService;