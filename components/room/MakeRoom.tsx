import { useState } from 'react';
import { createRoom, deleteRedisKey } from 'lib/api/room';
import { useSelector, RootState } from 'store';
import { Input, Button } from 'antd';

const MakeRoom = () => {
  const myInfo = useSelector((state: RootState) => state.auth.myInfo);

  const [roomName, setRoomName] = useState('');
  const handleInput = (e) => {
    setRoomName(e.target.value);
  };

  const submit = () => {
    createRoom({ roomId: roomName, id: myInfo?.id || 'test' });
  };

  const del = () => {
    deleteRedisKey();
  };
  return (
    <div>
      룸 이름
      <Input value={roomName} onChange={handleInput} />
      <Button onClick={submit}>방만들기</Button>
      <Button onClick={del}>방 전체 제거</Button>
    </div>
  );
};

export default MakeRoom;
