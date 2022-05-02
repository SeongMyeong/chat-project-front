import { useState } from 'react';
import { createRoom } from 'lib/api/room';
import { useSelector, RootState } from 'store';

const MakeRoom = () => {
  const myInfo = useSelector((state: RootState) => state.auth.myInfo);

  const [roomName, setRoomName] = useState('');
  const handleInput = (e) => {
    setRoomName(e.target.value);
  };

  const submit = () => {
    createRoom({ roomId: roomName, id: myInfo?.id || 'test' });
  };
  return (
    <div>
      룸 이름
      <input value={roomName} onChange={handleInput} />
      <button type="button" onClick={submit}>
        방만들기{' '}
      </button>
    </div>
  );
};

export default MakeRoom;
