import { data } from "autoprefixer";
import axiosClient from "./axiosClient";

const userApi = {
  register(data) {
    const url = "/users/signup";
    return axiosClient.post(url, data);
  },
  login(data) {
    const url = "users/login";
    return axiosClient.post(url, data);
  },
  loginWithGoogle(data) {
    const url = "/users/userLoginWith";
    return axiosClient.post(url, data);
  },
  verify(data) {
    const url = "/users/verify";
    return axiosClient.post(url, data);
  },
  forgotPassword(data) {
    const url = "/users/forgotPassword";
    return axiosClient.post(url, data);
  },
  changeState(data) {
    const url = "/users/changeState";
    return axiosClient.patch(url, data);
  },
  verifyResetPassword(data) {
    const url = "/users/verifyResetPass";
    return axiosClient.post(url, data);
  },
  getUser() {
    const url = "/users/me";
    return axiosClient.get(url);
  },
  resetPassword(data, token) {
    const url = `/users/resetPassword/${token}`;
    return axiosClient.patch(url, data);
  },
  updateUser(data) {
    const url = `/users/${data.id}`;
    return axiosClient.put(url, data);
  },
  addUser(data) {
    const url = "/users";
    return axiosClient.post(url, data);
  },
  getAddress() {
    const url = "/users/me/address";
    return axiosClient.get(url);
  },
  deleteUser(data) {
    const url = `/users/${data}`;
    return axiosClient.delete(url);
  },
  updateAddress(data) {
    const url = "/users/updateAddress";
    return axiosClient.patch(url, data);
  },
  updatePassword(data) {
    const url = "/users/updateMyPassword";
    return axiosClient.patch(url, data);
  },
  updateDefault(data) {
    const url = "/users/setDefaultAddress";
    return axiosClient.patch(url, data);
  },
  registerUser(data){
    const url="/users/register"
    return axiosClient.post(url,data)
  },
  changePasswordUser(data){
    const url="users/change-password"
    return axiosClient.post(url,data)
  },
  getUserByToken(){
    const url="users"
    return axiosClient.get(url)
  },
  getUserById(id){
    const url=`/users/${id}`
    return axiosClient.get(url)
  },
  getAllUser(){
    const url = `/users/all-paging-staff?page_size=100`;
    return axiosClient.get(url)
  },
  getAllCustomer(){
    const url = `/users/all-paging-user?page_size=100`;
    return axiosClient.get(url)
  },
  
};
export default userApi;
