import Request from './request';
export const getChatMessage = async ({ roomId, currentCursor }) => {
  const res = await Request.GET(`/api/chat/`, {
    roomId
  });
  // return data.data.reverse();
  return '';
};
