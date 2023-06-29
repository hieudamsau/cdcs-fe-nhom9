import axios from "axios";
const axiosClient = axios.create({
  baseURL: "http://localhost:3012",
  headers: {
    "Content-Type": "application/JSON",
  },
  // withCredentials: true,
});
axiosClient.interceptors.request.use(
  function (config) {
    // const token = localStorage.getItem('asses_token')||null
    const token = localStorage.getItem('asses_token')
    console.log("fmm",token);
    if(token){
      config.headers.Authorization = `Bearer ${token}`
    }
    // Do something before request is sent

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const { config, status, data } = error.response;
    const URLs = [
      "/users/signup",
      "/users/login",
      "/users/verify",
      "/users/forgotPassword",
      "/users/changeState",
      "/users/logout",
      "/users/verifyResetPass",
      "/users/me",
      "/users/resetPassword/:token",
      "/users/updateMe",
      "/users/createAddress",
      "/users/me/address",
      "/users/deleteAddress",
      "/users/updateAddress",
      "/users/updateMyPassword",
      "/users/setDefaultAddress",
      "/products",
      "/reviews",
      "/products/:id/reviews",
      "/reviews/:id",
      "/orders",
      "/users/userLoginWith",
      "/comments",
      "/products/:id/comments?query",
      "/comments/:id",
      "/comments/setLike/:id",
    ];
    if (
      (URLs.includes(config.url) && status === 500) ||
      status == 400 ||
      status == 401 ||
      status == 404 ||
      status == 403
    ) {
      throw new Error(data.message);
    }
    return Promise.reject(error);
  }
);
 
export default axiosClient;
