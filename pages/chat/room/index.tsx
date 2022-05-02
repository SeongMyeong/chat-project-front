import styled from 'styled-components';
import Room from 'components/room/Room';

const RoomContainer = () => {
  return (
    <div>
      <Room roomId="1" />
      <Room roomId="2" />
      <Room roomId="3" />
      <Room roomId="4" />
      <Room roomId="5" />
    </div>
  );
};

export default RoomContainer;
