import axios from 'axios';
import secrets from '../../secrets';
import JwtService from './JWTService';

const Axios = () => {
    let api_form = null;

    if (JwtService.getToken()) {
        api_form = axios.create({
            baseURL: secrets.URL_DFR,
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${JwtService.getToken()}`
            }
        });
    } else {
        api_form = axios.create({
            baseURL: secrets.URL_DFR,
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
    }

    api_form.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response.status === 403) {
                JwtService.destroyToken();
                window.location.reload();
            }
            return Promise.reject(error);
        }
    );

    return api_form;
}

export default Axios;