import Request from './request';
export const createRoom = async ({ roomId, id }) => {
  const res = await Request.POST(`/api/room/createChatRoom`, {
    room_id: roomId,
    id
  });
  return res;
};
/* 전체 채팅방 가져오기 */
export const getAllChatRoomList = async () => {
  const res = await Request.GET(`/api/room/getAllChatRoomList`);
  return res;
};

/* 들어간 채팅방 가져가기 */
export const getJoinChatRoomList = async ({ id }) => {
  const res = await Request.POST(`/api/room/getJoinChatRoomList`, {
    id
  });
  return res;
};

export const joinChatRoom = async ({ room_id, id }) => {
  const res = await Request.POST(`/api/room/joinChatRoom`, {
    room_id,
    id
  });
  return res;
};

export const leaveChatRoom = async ({ room_id, id }) => {
  const res = await Request.POST(`/api/room/leaveChatRoom`, {
    room_id,
    id
  });
  return res;
};
