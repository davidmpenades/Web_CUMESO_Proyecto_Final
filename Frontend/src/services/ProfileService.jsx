import api from './api';

const ProfileService = {
    getProfile() {
        return api().get('/profile/');
    },
    updateProfile() {
        return api().patch('/profile/update/');
    },
    deleteProfile() {
        return api().delete('/profile/delete/');
    },
};

export default ProfileService;