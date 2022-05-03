import { useRouter } from 'next/router';
import styled from 'styled-components';

const St = {
  RoomWrapper: styled.div`
    width: 200px;
    height: 40px;
    padding: 1rem;
    cursor: pointer;
    background: ${(props) => (props.isInRoom ? '#ffc9c9' : '#fff')};
  `,
  RoomContainer: styled.div`
    width: 100%;
    text-align: left;
    font-weight: bold;
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
      className=""
      onClick={handleRoomClick}
      isInRoom={roomId === roomIdParams}
    >
      <St.RoomContainer>
        <span>{roomId}</span>
      </St.RoomContainer>
    </St.RoomWrapper>
  );
};
export default Room;
