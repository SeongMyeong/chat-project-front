import styled from 'styled-components';
import Room from 'components/room/Room';
import { useSelector, RootState } from 'store';
import RoomContainer from 'components/room/RoomContainer';

const RoomWrapper = () => {
  return (
    <div>
      <RoomContainer />
    </div>
  );
};

export default RoomWrapper;
