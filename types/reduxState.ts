export interface ChatReduxState {
  socket: any;
  roomList: any[];
}

export type AuthReduxState = {
  isLogged: boolean;
  myInfo: any; // 내정보
  isLoadMyInfoLoading: boolean; // 로그인 정보 조회
  isLoadMyInfoDone: boolean;
  isLoadMyInfoError: any;
  isLoginLoading: boolean; // 로그인 시도중
  isLoginDone: boolean;
  isLoginError: any;
  isLogoutLoading: boolean; // 로그아웃 시도중
  isLogoutDone: boolean;
  isLogoutError: any;
  isSignupLoading: boolean; // 회원가입 시도중
  isSignupDone: boolean;
  isSignupError: any;
  isChangeNicknameLoading: boolean; // 닉네임 변경 시도중
  isChangeNicknameDone: boolean;
  isChangeNicknameError: any;
};
