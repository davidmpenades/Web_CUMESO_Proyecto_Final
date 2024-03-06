import api from './api';

const ProviderService = {
    getAll() {
        return api().get('/providers/');
    }
};

export default ProviderService;