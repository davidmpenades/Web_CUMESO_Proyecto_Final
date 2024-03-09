import api from './api';

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
    }
};

export default MachineService;