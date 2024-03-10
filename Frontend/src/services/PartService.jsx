import api from './api';

const PartService = {
    getAll() {
        return api().get('/parts/');
    },
    delete(slug) {
        return api().delete(`/part/${slug}/`);
    }
};

export default PartService;