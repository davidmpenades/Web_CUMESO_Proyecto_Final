import api from './api';

const DataService = {
    getImage(url) {
        console.log(url);
        return api().get(url);
    }
};

export default DataService;