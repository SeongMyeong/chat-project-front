import React, { useEffect } from 'react';
import { useDispatch } from '';
import { useSelector, RootState } from 'store';
import { toast } from 'react-toastify';
import request from 'lib/api/request';

type RoomListProps = {
  roomId: string;
};
const useRoomList = ({ roomId }: RoomListProps) => {
  const roomList = useSelector((state: RootState) => state.chat.roomList);

  const getRoomList = async () => {
    try {
      if (roomId !== null) {
        const { data } = await request.GET('/api/getJoinRoomList', {
          roomId: roomId
        });
        if (data.success) {
        } else throw '룸 목록 요청 오류';
      }
    } catch (err) {
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
