import { useRouter } from 'next/router';
const Room = ({ roomId }) => {
  const router = useRouter();
  const handleRoomClick = () => {
    router.push(`/chat/room/${roomId}`);
  };
  return (
    <div onClick={handleRoomClick} style={{ width: '200px' }}>
      방번호 ={roomId}
    </div>
  );
};
export default Room;
