import api from "./api";

const AuthService = {
  Login(data) {
    return api().post("login/", data);
  },
  getUser() {
    return api().get("user");
  },
  getAllUsers(){
    return api().get("users/")
  },
  Register(data) {
    console.log(data);
    return api().post("register/", data);
  },
  refreshToken() {
    return api().post("refresh_token");
  }
};

export default AuthService;
