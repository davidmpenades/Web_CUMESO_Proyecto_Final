import api from './api';

const ProviderService = {
    getAll() {
        return api().get('/providers/');
    },
    delete(slug) {
        return api().delete(`/providerDel/${slug}/`);
    },
    create(data) {
        return api().post('/provider/', data);
    },
    update(slug, data) {
        return api().patch(`/providerUpd/${slug}/`, data);
    },
    addPartToProvider(slug, partId) {
        console.log(slug, partId);
        return api().patch(`/providerUpd/${slug}/`, partId);
    },
    removePartFromProvider(slug, partId) {
        return api().patch(`/providerUpd/${slug}/`, partId);
    },
};

export default ProviderService;