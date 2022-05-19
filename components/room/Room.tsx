import { useRouter } from 'next/router';
import styled from 'styled-components';

const St = {
  RoomWrapper: styled.div`
    height: 40px;
    cursor: pointer;
    background: ${(props) => (props.isInRoom ? '#ffc9c9' : '#191919')};
  `,
  RoomContainer: styled.div`
    width: 100%;
    text-align: left;
    font-weight: bold;
    height: 100%;
    color: #fff;
  `
};
type RoomProps = {
  roomId: string;
  unreadCount?: any;
};
const Room = ({ roomId, unreadCount }: RoomProps) => {
  const router = useRouter();
  const roomIdParams = router.query?.room_id;
  const handleRoomClick = () => {
    router.push(`/chat/room/${roomId}`);
  };
  console.log(
    roomId,
    "unreadCount && unreadCount !== 0 && unreadCount !== '0'",
    unreadCount === 0
  );
  return (
    <St.RoomWrapper
      className=""
      onClick={handleRoomClick}
      isInRoom={roomId === roomIdParams}
    >
      <St.RoomContainer className="flex-center">
        <div className="flex-between" style={{ width: '100%' }}>
          <span>{roomId}</span>
          <span>
            {unreadCount !== 0 && (
              <span
                style={{
                  padding: '10px',
                  width: '20px',
                  background: '#ff6868',
                  color: 'white',
                  borderRadius: '4px'
                }}
              >
                {unreadCount}
              </span>
            )}
          </span>
        </div>
      </St.RoomContainer>
    </St.RoomWrapper>
  );
};
export default Room;
