import api from './api';
import api_form from './api_form';

const MachineService = {
    getAll() {
        return api().get('/machines/');
    },
    getImage(slug){
        return api().get(`/machineImage/${slug}/`);
    },
    updateVisibility(slug, visibilityData) {
        console.log(slug, visibilityData);
        return api().patch(`/machineImageUpd/${slug}/`, visibilityData);
    },
    delete(slug) {
        return api().delete(`/machineDel/${slug}/`);
    },
    create(data) {
        return api_form().post('/machine/', data);
    },
};

export default MachineService;