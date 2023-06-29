import axiosClient from "./axiosClient";

const orderApi = {
  createOrder(data) {
    const url = "/orders";
    return axiosClient.post(url, data);
  },
  cancelOrder(id, data) {
    const url = `/api/v1/orders/${id}`;
    return axiosClient.patch(url, data);
  },
  getOrder(id) {
    const url = `/orders/all-paging?page_size=20`;
    return axiosClient.get(url);
  },
  getOrderAdmin() {
    const url = `/orders/admin-all-paging`;
    return axiosClient.get(url);
  },
  getOrderId(id) {
    const url = `/api/v1/orders/${id}`;
    return axiosClient.get(url);
  },
  getAccountOrder(){
    const url = '/orders/account-order';
    return axiosClient.get(url);
  },
  changeOrderStatus(data) {
    const url = `/orders/${data.id}`;
    return axiosClient.put(url, {status:data.status});
  },
};
export default orderApi;
