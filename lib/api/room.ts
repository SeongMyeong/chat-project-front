import Request from './request';
export const createRoom = async ({ roomId, id }) => {
  const res = await Request.POST(`/api/room/createChatRoom`, {
    room_id: roomId,
    id
  });
  return res;
};
