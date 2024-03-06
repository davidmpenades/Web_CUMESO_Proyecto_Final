const JWTService = {
    getToken: () => {
        return localStorage.getItem("token");
    },
    saveToken: (token) => {
        localStorage.setItem("token", token);
    },
    saveRefreshToken(ref_token){
        localStorage.setItem("ref_token", ref_token)
    },
    destroyToken(){
        localStorage.removeItem("token")
    }
}

export default JWTService;