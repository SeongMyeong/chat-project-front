import Request from './request';
export const getChatMessage = async ({ roomId, id }) => {
  const res = await Request.GET(`/api/chat/getChatMessages`, {
    room_id: roomId,
    id
  });
  console.log('res = ', res);
  return res;
};
