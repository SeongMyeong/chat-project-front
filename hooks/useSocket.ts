import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { useSelector, RootState } from 'store';
import useRoomList from 'hooks/useRoomList';
import { SOCKET_EVENT } from 'lib/constants';
import isEmpty from 'lodash/isEmpty';
import { io } from 'socket.io-client';
import { chatActions } from 'store/chat';
const baseURL =
  process.env.NEXT_PUBLIC_NODE_ENV === 'development'
    ? process.env.NEXT_PUBLIC_DEV_CHAT_HOST
    : process.env.NEXT_PUBLIC_CHAT_HOST;

const useSocket = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const socket = useSelector((state: RootState) => state.chat.socket);
  const { roomList, updateRoomList } = useRoomList({
    roomId: router.query?.room_id as string
  });
  const roomId = router.query?.room_id;

  // const updateChannelInfo = async ({ channelId, workspaceUserInfo }) => {
  //   if (workspaceUserInfo && channelId)
  //     setChannelInfo(
  //       await getChannelHeaderInfo({
  //         workspaceUserInfoId: workspaceUserInfo._id,
  //         channelId
  //       })
  //     );
  // };

  useEffect(() => {
    if (roomId) {
      dispatch(chatActions.setSocket(io(`${baseURL}/${roomId}`)));
    }
  }, [roomId]);

  useEffect(() => {
    if (socket && !isEmpty(roomList)) {
      socket.emit(
        SOCKET_EVENT.JOIN_ROOM,
        roomList.map((channel) => channel.channelId._id)
      );
    }
    return () => {
      if (socket)
        socket.emit(
          SOCKET_EVENT.LEAVE_ROOM,
          roomList.map((channel) => channel.channelId._id)
        );
    };
  }, [socket, roomList]);

  return [socket];
};

export default useSocket;
