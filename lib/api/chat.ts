import Request from './request';
export const getChatMessage = async ({ roomId, currentCursor }) => {
  const res = await Request.GET(`/api/chat/getChatMessages`, {
    room_id: roomId
  });
  console.log('res = ', res);
  return res;
};
