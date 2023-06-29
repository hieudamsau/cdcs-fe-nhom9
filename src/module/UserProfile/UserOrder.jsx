import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Table from "../../components/table/Table";
import DashboardHeading from "../dashboard/DashboardHeding";
import { formatPrice } from "../../utils/formatPrice";
import { useSelector, useDispatch } from "react-redux";
import { changeOrderStatus, getOrder, refresh } from "../../redux/order/orderSlice";
import { useEffect } from "react";
import { action_status } from "../../utils/constants/status";
import { format } from "date-fns";
import { useState } from "react";
import Pagination from "react-js-pagination";
import queryString from "query-string";
import Skeleton from "../../components/skeleton/Skeleton";
import { toast } from "react-toastify";
import Button from "../../components/button/Button";

const UserOrder = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  // const { status, totalPage } = useSelector((state) => state.order);
  const { current } = useSelector((state) => state.user);
  const { order } = useSelector((state) => state.order);
  // const order = JSON.parse(localStorage.getItem("order"));
  console.log("orrder", order);
  const location = useLocation();
  const params = queryString.parse(location.search);
  const [state, setState] = useState(params.status);
  const [page, setPage] = useState(1);

  useEffect(() => {
    // if (current === null) {
    //   toast.dismiss();
    //   toast.warning("Vui lòng đăng nhập");
    //   navigate("/sign-in");
    // }
  }, [current]);

  useEffect(() => {
    try {
      // const data = {
      //   id: current.id,
      //   page: page,
      //   status: state,
      //   limit: 5,
      // };
      dispatch(getOrder());
      dispatch(refresh());
      setState(params.status);
    } catch (error) {
      console.log(error.message);
    }
  }, [page, state]);

  const handleClick = (e) => {
    setState(e.target.value);
    navigate(`/account/orders?status=${e.target.value}`);
    setPage(1);
  };

  const handlePageClick = (values) => {
    setPage(values);
  };

  const handeClickCancel = (item) => {
    console.log("hủy", item.id);
    dispatch(changeOrderStatus({ id: item.id, status: 3 })).then((res) => {
      dispatch(getOrder());
    })
  }
  const orderArr = [order];
  return (
    <div>
      <div className="flex items-center justify-between">
        <DashboardHeading
          title="Quản lý đơn hàng"
          className="px-5 py-5"
        ></DashboardHeading>
        <div className="flex items-center gap-x-3">
          <button
            className={`flex items-center gap-x-3 cursor-pointer py-2 px-4 text-base font-medium rounded-lg border border-gray-300 ${state === "All" || state === undefined
                ? "bg-blue-500 text-white"
                : ""
              }`}
            value="All"
            onClick={handleClick}
          >
            Tất cả đơn hàng
          </button>
          {/* <button
            className={`flex items-center gap-x-3 cursor-pointer py-2 px-4 text-base font-medium rounded-lg border border-gray-300 ${
              state === "Processed" ? "bg-blue-500 text-white" : ""
            }`}
            value="Processed"
            onClick={handleClick}
          >
            Đang xử lý
          </button>
          <button
            className={`flex items-center gap-x-3 cursor-pointer py-2 px-4  text-base font-medium rounded-lg border border-gray-300 ${
              state === "Success" ? "bg-blue-500 text-white" : ""
            }`}
            value="Success"
            onClick={handleClick}
          >
            Thành công
          </button>
          <button
            className={`flex items-center gap-x-3 cursor-pointer py-2 px-4 text-base font-medium rounded-lg border border-gray-300  ${
              state === "Cancelled" ? "bg-blue-500 text-white" : ""
            }`}
            value="Cancelled"
            onClick={handleClick}
          >
            Đã hủy đơn
          </button> */}
        </div>
      </div>

      {status === action_status.LOADING && (
        <>
          {" "}
          <Table>
            <thead>
              <tr>
                <th>Mã đơn hàng</th>
                <th>Ngày mua</th>
                <th>Sản phẩm</th>
                <th>Tổng tiền</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>
                  {" "}
                  <Skeleton className="w-40 h-5 rounded-md" />
                </th>
                <th>
                  <Skeleton className="w-40 h-5 rounded-md" />
                </th>
                <th>
                  <Skeleton className="w-40 h-5 rounded-md" />
                </th>
                <th>
                  <Skeleton className="w-40 h-5 rounded-md" />
                </th>
                <th>
                  <Skeleton className="w-40 h-5 rounded-md" />
                </th>
              </tr>
              <tr>
                <th>
                  {" "}
                  <Skeleton className="w-40 h-5 rounded-md" />
                </th>
                <th>
                  <Skeleton className="w-40 h-5 rounded-md" />
                </th>
                <th>
                  <Skeleton className="w-40 h-5 rounded-md" />
                </th>
                <th>
                  <Skeleton className="w-40 h-5 rounded-md" />
                </th>
                <th>
                  <Skeleton className="w-40 h-5 rounded-md" />
                </th>
              </tr>
              <tr>
                <th>
                  {" "}
                  <Skeleton className="w-40 h-5 rounded-md" />
                </th>
                <th>
                  <Skeleton className="w-40 h-5 rounded-md" />
                </th>
                <th>
                  <Skeleton className="w-40 h-5 rounded-md" />
                </th>
                <th>
                  <Skeleton className="w-40 h-5 rounded-md" />
                </th>
                <th>
                  <Skeleton className="w-40 h-5 rounded-md" />
                </th>
              </tr>
            </tbody>
          </Table>
        </>
      )}
      {order && (
        <>
          {order?.length === 0 && (
            <div className="bg-white container rounded-lg h-[400px] flex flex-col items-center justify-center gap-y-3 ">
              <img
                src="../images/logo-cart.png"
                alt=""
                className="w-[250px] h-[250px]"
              />
              <span className="text-lg font-medium text-gray-400">
                Hiện không có đơn hàng nào
              </span>
            </div>
          )}
          {order && (
            <>
              {" "}
              <Table>
                <thead>
                  <tr>
                    {/* <th>Mã đơn hàng</th>
                    <th>Ngày mua</th> */}
                    <th>Sản phẩm</th>
                    <th >Tổng tiền</th>
                    <th style={{ width: 230 }}>Trạng thái</th>
                    <th style={{ width: 230 }}>Trạng thái thanh toán</th>
                    <th style={{ width: 230 }}>Hủy</th>
                  </tr>
                </thead>
                <tbody>
                  {(state === "All" || state === undefined) && (
                    <>
                      {
                        order?.map((item) => (
                           <tr className="text-base" key={item._id}>
                            {/* <td
                              className="cursor-pointer text-blue-600 hover:text-blue-900"
                              onClick={() =>
                                navigate(`/account/orders/${item._id}`)
                              }
                              title={item._id}
                            >
                              {item._id.slice(0, 10)}
                            </td>
                            <td>
                              {format(new Date(item?.createdAt), "HH:mm")}
                              &nbsp;&nbsp;
                              {format(new Date(item?.createdAt), "dd/MM/yyyy")}
                            </td> */}
                            <td>{item.order_details?.map((x,index) => (
                              <span key={index}>{x.product.name}</span>
                            ))}</td>
                            <td>{formatPrice(item.total_price)}</td>
                            {item?.status === 0 && (
                              <td>
                                <span className="p-2 rounded-lg text-white bg-orange-400">
                                  Đang xử lý
                                </span>
                              </td>
                            )}
                            <td>
                              {item?.payment_status === 1 ?
                                "Đã thanh toán":"Chưa thanh toán"
                              }
                            </td>

{item?.status === 0 ? (<td><Button style={{
                              width: "100%",
                              maxWidth: 250,
                              margin: "30px auto",
                              height: "50px",
                              color: "red",
                              border: "1px solid"
                            }}

                              onClick={() => handeClickCancel(item)}
                            >Hủy</Button></td>):( <td></td>)}
                           
                            {item?.status === 1 && (
                              <td>
                                <span className="p-2 rounded-lg text-white bg-yellow-400">
                                  Đang giao hàng
                                </span>
                              </td>
                            )}
                            {item?.status === 3 && (
                              <td>
                                <span className="p-2 rounded-lg text-white bg-red-400">
                                  Đã hủy đơn
                                </span>
                              </td>
                            )}
                            {item?.status === 2 && (
                              <td>
                                <span className="p-2 rounded-lg text-white  bg-green-400">
                                  Thành công
                                </span>
                              </td>
                            )}
                          </tr>
                        ))}
                    </>
                  )}
                  {state === "Processed" && (
                    <>
                      {order?.length > 0 &&
                        order.map((item) => (
                          <tr className="text-base" key={item._id}>
                            <td
                              className="cursor-pointer text-blue-600 hover:text-blue-900"
                              onClick={() =>
                                navigate(`/account/orders/${item._id}`)
                              }
                              title={item._id}
                            >
                              {item._id.slice(0, 10)}
                            </td>
                            <td>
                              {format(new Date(item?.createdAt), "HH:mm")}
                              &nbsp;&nbsp;
                              {format(new Date(item?.createdAt), "dd/MM/yyyy")}
                            </td>
                            <td>{item.cart[0].product.title.slice(0, 50)}</td>
                            <td>{formatPrice(item.totalPrice)}</td>
                            <td>
                              <span className="p-2 rounded-lg text-white bg-orange-400">
                                Đang xử lý
                              </span>
                            </td>
                          </tr>
                        ))}
                    </>
                  )}
                  {state === "Cancelled" && (
                    <>
                      {order?.length > 0 &&
                        order.map((item) => (
                          <tr className="text-base" key={item._id}>
                            <td
                              className="cursor-pointer text-blue-600 hover:text-blue-900"
                              onClick={() =>
                                navigate(`/account/orders/${item._id}`)
                              }
                              title={item._id}
                            >
                              {item._id.slice(0, 10)}
                            </td>
                            <td>
                              {format(new Date(item?.createdAt), "HH:mm")}
                              &nbsp;&nbsp;
                              {format(new Date(item?.createdAt), "dd/MM/yyyy")}
                            </td>
                            <td>{item.cart[0].product.title.slice(0, 50)}</td>
                            <td>{formatPrice(item.totalPrice)}</td>

                            <td>
                              <span className="p-2 rounded-lg text-white bg-red-400">
                                Đã hủy đơn
                              </span>
                            </td>
                          </tr>
                        ))}
                    </>
                  )}
                  {state === "Success" && (
                    <>
                      {order?.length > 0 &&
                        order.map((item) => (
                          <tr className="text-base" key={item._id}>
                            <td
                              className="cursor-pointer text-blue-600 hover:text-blue-900"
                              onClick={() =>
                                navigate(`/account/orders/${item._id}`)
                              }
                              title={item._id}
                            >
                              {item._id.slice(0, 10)}
                            </td>
                            <td>
                              {format(new Date(item?.createdAt), "HH:mm")}
                              &nbsp;&nbsp;
                              {format(new Date(item?.createdAt), "dd/MM/yyyy")}
                            </td>
                            <td>{item.cart[0].product.title.slice(0, 50)}</td>
                            <td>{formatPrice(item.totalPrice)}</td>

                            <td>
                              <span className="p-2 rounded-lg text-white  bg-green-400">
                                Thành công
                              </span>
                            </td>
                          </tr>
                        ))}
                    </>
                  )}
                </tbody>
              </Table>
              <div className="flex items-center justify-center mt-5">
                {/* <Pagination
                  activePage={page}
                  nextPageText={">"}
                  prevPageText={"<"}
                  totalItemsCount={totalPage}
                  itemsCountPerPage={1}
                  firstPageText={"<<"}
                  lastPageText={">>"}
                  linkClass="page-num"
                  onChange={handlePageClick}
                /> */}
              </div>
            </>
          )}
        </>
      )}
      {status === action_status.FAILED && (
        <>
          {(state === "All" || state === undefined) && (
            <div className="bg-white container rounded-lg h-[400px] flex flex-col items-center justify-center gap-y-3 ">
              <img
                src="../images/logo-cart.png"
                alt=""
                className="w-[250px] h-[250px]"
              />
              <span className="text-lg font-medium text-gray-400">
                Hiện không có đơn hàng nào
              </span>
            </div>
          )}{" "}
          {state === "Success" && (
            <div className="bg-white container rounded-lg h-[400px] flex flex-col items-center justify-center gap-y-3 ">
              <img
                src="../images/logo-cart.png"
                alt=""
                className="w-[250px] h-[250px]"
              />
              <span className="text-lg font-medium text-gray-400">
                Hiện không có đơn hàng nào thành công
              </span>
            </div>
          )}
          {state === "Processed" && (
            <div className="bg-white container rounded-lg h-[400px] flex flex-col items-center justify-center gap-y-3 ">
              <img
                src="../images/logo-cart.png"
                alt=""
                className="w-[250px] h-[250px]"
              />
              <span className="text-lg font-medium text-gray-400">
                Hiện không có đơn hàng nào chờ xử lý
              </span>
            </div>
          )}
          {state === "Cancelled" && (
            <div className="bg-white container rounded-lg h-[400px] flex flex-col items-center justify-center gap-y-3 ">
              <img
                src="../images/logo-cart.png"
                alt=""
                className="w-[250px] h-[250px]"
              />
              <span className="text-lg font-medium text-gray-400">
                Hiện không có đơn hàng nào trong danh sách hủy
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UserOrder;
