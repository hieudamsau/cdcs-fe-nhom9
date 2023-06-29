import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import orderApi from "../../api/orderApi";
import { action_status } from "../../utils/constants/status";

const initialState = {
  status: action_status.IDLE,
  statusId: action_status.IDLE,
  totalPage: null,
  order: {},
  orderId: {},
  update: false,
};

export const getOrderId = createAsyncThunk(
  "user/getOrderId",
  async (payload) => {
    const response = await orderApi.getOrderId(payload);
    return response.data;
  }
);

export const cancelOrder = createAsyncThunk(
  "user/cancelOrder",
  async (payload) => {
    const response = await orderApi.cancelOrder(payload.id, payload.data);
    return response.data;
  }
);

export const getOrder = createAsyncThunk("user/getOrder", async (id) => {
  const response = await orderApi.getOrder(id);
  return response.data;
});
export const getOrderAdmin = createAsyncThunk("user/getOrderAdmin", async () => {
  const response = await orderApi.getOrderAdmin();
  return response.data;
});
export const getAccountOrders = createAsyncThunk("user/getAccountOrders", async () => {
  const response = await orderApi.getAccountOrder();

  return response.data;
});
export const changeOrderStatus = createAsyncThunk("user/changeOrderStatus", async (data) => {
  const response = await orderApi.changeOrderStatus(data);
  return response.data;
});

const orderSlice = createSlice({
  name: "order",
  initialState:{
    order:[],
    orderAdmin:[],
    orderAccount:{},
    isUpdate:false
  },
  reducers: {
    refresh: (state, action) => {
      state.update = false;
    },
    
  },
  extraReducers: {
    [getOrder.pending]: (state, action) => {
      state.status = action_status.LOADING;
    },
    [getOrder.fulfilled]: (state, action) => {
      state.status = action_status.SUCCEEDED;
      state.order = action.payload.data;
      
    },
    [getOrder.rejected]: (state, action) => {
      state.status = action_status.FAILED;
    },
    [changeOrderStatus.pending]: (state, action) => {
      state.status = action_status.LOADING;
    },
    [changeOrderStatus.fulfilled]: (state, action) => {
      state.status = action_status.SUCCEEDED;
      state.isUpdate = true;
      
    },
    [changeOrderStatus.rejected]: (state, action) => {
      state.status = action_status.FAILED;
    },
    [getOrderAdmin.pending]: (state, action) => {
      state.status = action_status.LOADING;
    },
    [getOrderAdmin.fulfilled]: (state, action) => {
      state.status = action_status.SUCCEEDED;
      state.orderAdmin = action.payload.data;
    },
    [getOrderAdmin.rejected]: (state, action) => {
      state.status = action_status.FAILED;
    },
    [getOrderId.pending]: (state, action) => {
      state.statusId = action_status.LOADING;
    },
    [getOrderId.fulfilled]: (state, action) => {
      state.statusId = action_status.SUCCEEDED;
      state.orderId = action.payload.data;
    },
    [getOrderId.rejected]: (state, action) => {
      state.statusId = action_status.FAILED;
    },
    [cancelOrder.fulfilled]: (state, action) => {
      state.update = true;
    },
    [getAccountOrders.pending]: (state, action) => {
      state.status = action_status.LOADING;
    },
    [getAccountOrders.fulfilled]: (state, action) => {
      state.status = action_status.SUCCEEDED;
      state.orderAccount = action.payload;
      
    },
    [getAccountOrders.rejected]: (state, action) => {
      state.status = action_status.FAILED;
    },
  },
});
const { actions, reducer } = orderSlice;
export const { refresh } = actions;
export default reducer;
