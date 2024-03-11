import api from './api';
import api_form from './api_form';

const ProfileService = {
    getProfile() {
        return api().get('/profile/');
    },
    deleteProfile() {
        return api().delete('/profile/delete/');
    },
    updateImage(formData) {    
        console.log(formData); 
        return api_form().patch('/profile/update/', formData);
    }
};

export default ProfileService;