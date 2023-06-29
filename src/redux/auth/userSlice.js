import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from "../../api/userApi";
import { action_status } from "../../utils/constants/status";
import StorageKeys from "../../utils/constants/storage-keys";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";

export const register = createAsyncThunk("user/register", async (payload) => {
  const response = await userApi.register(payload);
  localStorage.setItem(StorageKeys.TOKEN, response.token);
  localStorage.setItem(StorageKeys.USER, JSON.stringify(response.data.user));
  return response.data.user;
});

export const verify = createAsyncThunk("user/verify", async (payload) => {
  const response = await userApi.verify(payload);
  localStorage.setItem("tokenStream", response.tokenStream);
  localStorage.setItem(StorageKeys.TOKEN, response.token);
  localStorage.setItem(StorageKeys.USER, JSON.stringify(response.data.user));
  return response.data.user;
});

export const changeState = createAsyncThunk(
  "user/changeState",
  async (payload) => {
    const response = await userApi.changeState(payload);
    localStorage.setItem(StorageKeys.USER, JSON.stringify(response.data.user));
    return response.data.user;
  }
);

export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async (payload) => {
    console.log(payload);
    const response = await userApi.resetPassword(payload, payload.token);
    localStorage.setItem("tokenStream", response.tokenStream);
    localStorage.setItem(StorageKeys.TOKEN, response.token);
    localStorage.setItem(StorageKeys.USER, JSON.stringify(response.data.user));
    return response.data.user;
  }
);

export const forgotPassword = createAsyncThunk(
  "user/fotgotPassword",
  async (payload) => {
    const response = await userApi.forgotPassword(payload);
    return response.data.user;
  }
);

export const verifyResetPassword = createAsyncThunk(
  "user/verifyResetPassword",
  async (payload) => {
    const response = await userApi.verifyResetPassword(payload);
    return response;
  }
);

export const login = createAsyncThunk("users/login", async (payload) => {
  const response = await userApi.login(payload);
  localStorage.setItem("asses_token", response.data.access_token);
  localStorage.setItem("user", JSON.stringify(response.data.data_user));
  return response.data.data_user;
});

export const loginWithGoogle = createAsyncThunk(
  "user/loginWithGoogle",
  async (payload) => {
    const response = await userApi.loginWithGoogle(payload);
    localStorage.setItem("tokenStream", response.tokenStream);
    localStorage.setItem(StorageKeys.TOKEN, response.token);
    localStorage.setItem(StorageKeys.USER, JSON.stringify(response.data.user));
    return response.data.user;
  }
);

export const updateInfoUser = createAsyncThunk(
  "user/updateInfoUser",
  async (payload) => {
    const response = await userApi.updateUser(payload);
    localStorage.setItem(StorageKeys.TOKEN, response.token);
    localStorage.setItem(StorageKeys.USER, JSON.stringify(response.data.user));
    return response.data.user;
  }
);

export const updateUserAdmin = createAsyncThunk(
  "user/updateUserAdmin",
  async (payload) => {
    console.log("payload", payload);
    const response = await userApi.updateUser(payload);
    return response;
  }
);

export const addUserAdmin = createAsyncThunk("user/addUser",
async (payload) => {
  const response = await userApi.addUser(payload);
  return response;
}
)

export const getUser = createAsyncThunk("user/getUser", async () => {
  const response = await userApi.getUser();
  return response.data.data;
});

export const getAllUser = createAsyncThunk("user/getAllUser", async () => {
  const response = await userApi.getAllUser();
  console.log(response);
  return response.data;
});
export const getAllCustomer = createAsyncThunk("user/getAllCustomer", async () => {
  const response = await userApi.getAllCustomer();
  console.log(response);
  return response.data;
});


export const registerUser = createAsyncThunk("user/registerUser", async (data) => {
  const response = await userApi.registerUser(data);
  return response.data;
});
export const changePasswordUser = createAsyncThunk("user/changPassword", async (data) => {
  const response = await userApi.changePasswordUser(data);
  return response.data;
});
export const getUserByToken = createAsyncThunk("user/getUserByToken", async () => {
  const response = await userApi.getUserByToken();
  return response.data;
});

export const getUserById = createAsyncThunk("user/getUserById", async (payload) => {
    const response = await userApi.getUserById(payload);
    return response;

});
export const deleteUser = createAsyncThunk(
  "user/deleteUsers",
  async (payload) => {
    const response = await userApi.deleteUser(payload);
    return response;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    current: JSON.parse(localStorage.getItem("user")) ,
    // status: action_status.IDLE,
    user: {},
    update: false,
    userByToken:{},
    allUser : [],
    allCustomer : [],
    userById:{}
  },
  reducers: {
    logout(state) {
      // localStorage.removeItem(StorageKeys.TOKEN);
      // localStorage.removeItem(StorageKeys.USER);
      // localStorage.removeItem("order");
      // localStorage.removeItem("keyword");
      // localStorage.removeItem("tokenStream");
      // state.current = null;
    },
    refresh: (state, action) => {
      state.update = false;
    },
  },
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
    [login.fulfilled]: (state, action) => {
      state.user = action.payload;
      toast.success("Đăng nhập thành công")
  
      
    },
    [login.rejected]: (state, action) => {
      // state.user = action.payload;
      toast.error("Đăng nhập thất bại")
    },
    [loginWithGoogle.fulfilled]: (state, action) => {
      state.current = action.payload;
      state.user = action.payload;
    },
    [verify.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
    [changeState.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
    [resetPassword.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
    [getUser.pending]: (state, action) => {
      state.status = action_status.LOADING;
    },
    [getUser.fulfilled]: (state, action) => {
      state.status = action_status.SUCCEEDED;
      state.user = action.payload;
      state.current = action.payload;
    },
    [getUser.rejected]: (state, action) => {
      state.status = action_status.FAILED;
    },
    [getUserByToken.pending]: (state, action) => {
      state.status = action_status.LOADING;
    },
    [getUserByToken.fulfilled]: (state, action) => {
      state.status = action_status.SUCCEEDED;
      state.userByToken = action.payload;
      state.current = action.payload;
    },
    [getUserByToken.rejected]: (state, action) => {
      state.status = action_status.FAILED;
    },
    [getAllUser.pending]: (state, action) => {
      state.status = action_status.LOADING;
    },
    [getAllUser.fulfilled]: (state, action) => {
      state.status = action_status.SUCCEEDED;
      state.allUser = action.payload.data;
    },
    [getAllUser.rejected]: (state, action) => {
      state.status = action_status.FAILED;
    },
    [getAllCustomer.pending]: (state, action) => {
      state.status = action_status.LOADING;
    },
    [getAllCustomer.fulfilled]: (state, action) => {
      state.status = action_status.SUCCEEDED;
      state.allCustomer = action.payload.data;
    },
    [getAllCustomer.rejected]: (state, action) => {
      state.status = action_status.FAILED;
    },
    [updateInfoUser.fulfilled]: (state, action) => {
      state.update = true;
    },
    [getUserById.pending]: (state, action) => {
      state.statusId = action_status.LOADING;
    },
    [getUserById.fulfilled]: (state, action) => {
      state.statusId = action_status.SUCCEEDED;
      console.log("action" , action);
      state.userById = action.payload.data;
    },
    [getUserById.rejected]: (state, action) => {
      state.statusId = action_status.FAILED;
    },
  },
});

const { actions, reducer } = userSlice;
export const { logout, refresh } = actions;
export default reducer;
