import api from './api';

const ProviderService = {
    getAll() {
        return api().get('/providers/');
    },
    delete(slug) {
        return api().delete(`/providerDel/${slug}/`);
    }
};

export default ProviderService;