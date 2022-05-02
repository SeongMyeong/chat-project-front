import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector, RootState } from 'store';
import { toast } from 'react-toastify';
import request from 'lib/api/request';
import { chatActions } from 'store/chat';
import {
  getAllChatRoomList,
  getJoinChatRoomList,
  joinChatRoom,
  leaveChatRoom
} from 'lib/api/room';
type RoomListProps = {
  roomId: string;
};
const useRoomList = ({ roomId }: RoomListProps) => {
  const roomList = useSelector((state: RootState) => state.chat.roomList);
  const dispatch = useDispatch();
  const getRoomList = async () => {
    try {
      console.log('[seo]  getRoomList ', roomId);
      if (roomId !== null) {
        const res = await getJoinChatRoomList({ id: 'test' });
        const { data, status } = res;
        console.log('[seo] sgetRoomList ', data, status);
        if (data) {
          dispatch(chatActions.setRoomList(data.result));
        } else {
          console.log('[seo] hi');
        }
      }
    } catch (err) {
      console.log('[seo] err');
      toast.error('룸 목록 요청에 오류가 발생했습니다.', {
        onClose: () => alert('onClose 이벤트')
      });
    }
  };

  useEffect(() => {
    getRoomList();
  }, [roomId]);

  const updateRoomList = async () => getRoomList();

  return { roomList, updateRoomList };
};

export default useRoomList;
