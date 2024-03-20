import api from './api';
import api_form from './api_form';

const PartService = {
    getAll() {
        return api().get('/parts/');
    },
    delete(slug) {
        return api().delete(`/part/${slug}/`);
    },
    create(formdata) {
        return api_form().post('/part/', formdata);
    },
};

export default PartService;