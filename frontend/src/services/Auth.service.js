import api from '../common/api'

const AuthService = {}

AuthService.login = (data) => {
  return api
    .post("/auth/login", data)
};
AuthService.logout = () => {
  return api
    .post("/auth/logout")
};

AuthService.sendotp = (data) => {
  return api
    .post("/auth/mfa_code", data)
};
AuthService.getUser = () => {
  return api
    .get("/auth/user")
};

AuthService.getQrCode = () => {
  return api
    .get("/auth/qrcode")
};
AuthService.registerMFA = (data) => {
  return api
    .post("/auth/register_mfa", data)
};
export default AuthService;
