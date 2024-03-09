import api from "./api";

const AuthService = {
  Login(data) {
    return api().post("login/", data);
  },
  getUser() {
    return api().get("user/");
  },
  getAllUsers(){
    return api().get("users/")
  },
  Register(data) {
    return api().post("register/", data);
  }
};

export default AuthService;
