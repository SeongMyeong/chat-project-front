import { HYDRATE, createWrapper } from 'next-redux-wrapper';
import {
  configureStore,
  combineReducers,
  getDefaultMiddleware
} from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useSelector as useReduxSelector
} from 'react-redux';

import auth from './auth';
import chat from './chat';
import test from './test';
import modal from './modal';

const rootReducer = combineReducers({
  auth: auth.reducer,
  chat: chat.reducer,
  test: test.reducer,
  modal: modal.reducer
  /* store reducer를 위와 같은 형식처럼 넣어주세요.*/
});

//* 스토어의 타입
export type RootState = ReturnType<typeof rootReducer>;

// let initialRootState: RootState

const reducer = (state: any, action: any) => {
  if (action.type === HYDRATE) {
    // if (state === initialRootState) {
    // return {
    //   ...state,
    //   ...action.payload
    // };
    // }
    const nextState = {
      ...state,
      ...action.payload
    };
    return nextState;
  }
  return rootReducer(state, action);
};

//* 타입 지원되는 커스텀 useSelector 만들기
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

/*
  modal callback 함수 위한 세팅 위해 
  serializableCheck false로 변경 
*/
const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false
});

export const store = configureStore({
  reducer,
  middleware: customizedMiddleware,
  devTools: true
});

const makeStore = () => store;

export const wrapper = createWrapper(makeStore);
