import axios from 'axios';
import JwtService from './JWTService';
import secrets from '../../secrets';

const Axios = () => {
    let api = null;   

    if (JwtService.getToken('token')) {
        api = axios.create({
            baseURL: secrets.URL_DFR,
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${JwtService.getToken()}`
            }
        });
    } else {
    api = axios.create({    
        baseURL: secrets.URL_DFR,
        headers: {
            'Content-Type': 'application/json',
        }
    });
    }
    api.interceptors.response.use(
        (response) => response,
        (error) => {
            console.log(error);
            return Promise.reject(error);
        }
    );
    return api;
}

export default Axios;
