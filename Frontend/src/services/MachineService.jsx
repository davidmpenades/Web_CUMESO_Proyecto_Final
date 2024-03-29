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
        return api().patch(`/machineImageUpd/${slug}/`, visibilityData);
    },
    updateMachine(slug, formdata) {
        console.log(slug, formdata);
        return api_form().patch(`/machineUpd/${slug}/`, formdata);
    }, 
    addPartToMachine(slug, partId) {
        console.log(slug, partId);
        return api().patch(`/machineUpd/${slug}/`,  partId  );
    },   
    removePartFromMachine(slug, partId) {
        return api().patch(`/machineUpd/${slug}/`, partId );
    },
    delete(slug) {
        return api().delete(`/machineDel/${slug}/`);
    },
    create(formdata) {
        return api_form().post('/machine/', formdata);
    },
};

export default MachineService;