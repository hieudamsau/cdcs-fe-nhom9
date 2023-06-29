import axiosClient from "./axiosClient";

const productApi = {
  getAllProduct(type) {
    const url = `/products/all-paging?page_size=100 ${type ? `&type=${type}`:""} `;
    return axiosClient.get(url);
  },
  getProductId(id) {
    const url = `/products/${id}`;
    return axiosClient.get(url);
  },
  getBrand() {
    const url = `/brands`;
    return axiosClient.get(url);
  },
  addProduct(data) {
    const url = `/products`;
    return axiosClient.post(url,data);
  },
  editProduct(data) {
    const url = `/products/${data.id}`;
    return axiosClient.put(url,data);
  },
  deleteProducts(data) {
    const url = `/products/${data}`;
    return axiosClient.delete(url);
  },
  searchProduct(name)  {
    const url = `/products/search?name=${name}`
    return axiosClient.get(url)
  }
};
export default productApi;
