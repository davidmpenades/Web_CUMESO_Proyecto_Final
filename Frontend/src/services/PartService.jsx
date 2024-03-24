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
    update(slug, formdata) {
        return api_form().put(`/part/${slug}/`, formdata);
    },
    getImage(slug) {
        return api().get(`/part/${slug}/image/`);
    },
};

export default PartService;