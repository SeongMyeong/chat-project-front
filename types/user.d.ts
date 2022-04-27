export type UserTypeRes = {
  status: number;
  message: string;
  data: UserType;
};

export type UserType = {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  birthday: string;
  profileImage: string;
};

//* users.json에 저장된 유저 타입
export type StoredUserType = {
  id: number;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  birthday: string;
  profileImage: string;
};

export type SingUpAPIParams = {
  email: string;
  name: string;
  password: string;
};

export type LoginAPIParams = {
  user_id: string;
  password: string;
};
