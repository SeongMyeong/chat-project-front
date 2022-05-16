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
type RoomProps = {
  roomId: string;
  unreadCount?: number;
};
const Room = ({ roomId, unreadCount }: RoomProps) => {
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
      <St.RoomContainer className="flex-between">
        <span>{roomId}</span>
        {unreadCount && unreadCount !== 0 && (
          <span
            style={{
              padding: '10px',
              width: '20px',
              background: 'red',
              color: 'white',
              borderRadius: '4px'
            }}
          >
            {unreadCount}
          </span>
        )}
      </St.RoomContainer>
    </St.RoomWrapper>
  );
};
export default Room;
