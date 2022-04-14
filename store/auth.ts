import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { signup, login, logout, loadMyInfo } from 'lib/api/auth';
import { SingUpAPIParams, AuthReduxState, LoginAPIParams } from 'types';

export const SignUpThunk = createAsyncThunk(
  'auth/SignUpThunk',
  // eslint-disable-next-line consistent-return
  async (params: SingUpAPIParams, thunkAPI) => {
    try {
      const response = await signup(params);
      console.log('response', response);
      return { data: response.data };
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const loginThunk = createAsyncThunk(
  'auth/loignThunk',
  // eslint-disable-next-line consistent-return
  async (params: LoginAPIParams, thunkAPI) => {
    try {
      const response = await login(params);
      console.log('response', response);
      return { data: response.data };
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
export const logOutThunk = createAsyncThunk(
  'auth/logOutThunk',
  // eslint-disable-next-line consistent-return
  async (params: SingUpAPIParams, thunkAPI) => {
    try {
      const response = await logout();
      console.log('response', response);
      return { data: response.data };
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const loadMyInfoThunk = createAsyncThunk(
  'auth/loadMyInfoThunk',
  // eslint-disable-next-line consistent-return
  async (_, thunkAPI) => {
    try {
      const response = await loadMyInfo();
      return { data: response.data };
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const changeNicknameThunk = createAsyncThunk(
  'auth/changeNicknameThunk',
  // eslint-disable-next-line consistent-return
  async (params: SingUpAPIParams, thunkAPI) => {
    try {
      const response = await signup(params);
      console.log('response', response);
      return { data: response.data };
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

//* 초기 상태
const initialState: AuthReduxState = {
  isLogged: false,
  myInfo: null, // 내정보
  isLoadMyInfoLoading: false, // 로그인 정보 조회
  isLoadMyInfoDone: false,
  isLoadMyInfoError: null,
  isLoginLoading: false, // 로그인 시도중
  isLoginDone: false,
  isLoginError: null,
  isLogoutLoading: false, // 로그아웃 시도중
  isLogoutDone: false,
  isLogoutError: null,
  isSignupLoading: false, // 회원가입 시도중
  isSignupDone: false,
  isSignupError: null,
  isChangeNicknameLoading: false, // 닉네임 변경 시도중
  isChangeNicknameDone: false,
  isChangeNicknameError: null
};

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      // login
      .addCase(loginThunk.pending, (state) => {
        state.isLoginLoading = true;
        state.isLoginDone = false;
        state.isLoginError = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.isLoginLoading = false;
        state.myInfo = action.payload.data;
        state.isLoginDone = true;
        state.isLogged = true;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.isLoginLoading = false;
        state.isLoginError = action.payload;
      })
      // logout
      .addCase(logOutThunk.pending, (state) => {
        state.isLogoutLoading = true;
        state.isLogoutDone = false;
        state.isLogoutError = null;
      })
      .addCase(logOutThunk.fulfilled, (state) => {
        state.isLogoutLoading = false;
        state.isLogoutDone = true;
        state.myInfo = null;
      })
      .addCase(logOutThunk.rejected, (state, action) => {
        state.isLogoutLoading = false;
        state.isLogoutError = action.payload;
      })
      // signup
      .addCase(SignUpThunk.pending, (state) => {
        state.isSignupLoading = true;
        state.isSignupDone = false;
        state.isSignupError = null;
      })
      .addCase(SignUpThunk.fulfilled, (state) => {
        state.isSignupLoading = false;
        state.isSignupDone = true;
      })
      .addCase(SignUpThunk.rejected, (state, action) => {
        state.isSignupLoading = false;
        state.isSignupError = action.payload;
      })
      // loadMyInfo
      .addCase(loadMyInfoThunk.pending, (state) => {
        state.isLoadMyInfoLoading = true;
        state.isLoadMyInfoDone = false;
        state.isLoadMyInfoError = null;
      })
      .addCase(loadMyInfoThunk.fulfilled, (state, action) => {
        state.isLoadMyInfoLoading = false;
        state.isLoadMyInfoDone = true;
        state.myInfo = action.payload.data.data.USER_DATA;
        if (action.payload.data.mem_email !== '') {
          state.isLogged = true;
        }
      })
      .addCase(loadMyInfoThunk.rejected, (state, action) => {
        state.isLoadMyInfoLoading = false;
        state.isLoadMyInfoError = action.payload;
      })

      // changeNickname
      // .addCase(changeNicknameThunk.pending, (state) => {
      //   state.changeNicknameLoading = true;
      //   state.changeNicknameDone = false;
      //   state.changeNicknameError = null;
      // })
      // .addCase(changeNicknameThunk.fulfilled, (state, action) => {
      //   state.changeNicknameLoading = false;
      //   state.changeNicknameDone = true;
      //   state.myInfo.nickname = action.payload.nickname;
      // })
      // .addCase(changeNicknameThunk.rejected, (state, action) => {
      //   state.changeNicknameLoading = false;
      //   state.changeNicknameError = action.payload;
      // })
      .addDefaultCase((state) => state)
});

export const authActions = { ...auth.actions };

export default auth;
