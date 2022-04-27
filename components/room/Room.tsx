import { useRouter } from 'next/router';
import styled from 'styled-components';

const St = {
  RoomWrapper: styled.div`
    width: 200px;
    height: 40px;
    padding: 1rem;
    border: 1px solid;
    cursor: pointer;
    background: ${(props) => (props.isInRoom ? 'red' : '#fff')};
  `
};
const Room = ({ roomId }) => {
  const router = useRouter();
  const roomIdParams = router.query?.room_id;
  const handleRoomClick = () => {
    router.push(`/chat/room/${roomId}`);
  };

  return (
    <St.RoomWrapper
      onClick={handleRoomClick}
      isInRoom={roomId === roomIdParams}
    >
      방번호 {roomId}
    </St.RoomWrapper>
  );
};
export default Room;
