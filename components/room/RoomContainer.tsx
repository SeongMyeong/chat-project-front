import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Room from 'components/room/Room';
import MakeRoom from 'components/room/MakeRoom';
import { useSelector, RootState } from 'store';
import { Tabs } from 'antd';

const St = {
  RoomContainerWrapper: styled.div`
    padding: 0px 20px;
    width: 200px;
    background: rgb(64, 63, 63);
  `
};
const { TabPane } = Tabs;

const RoomContainer = ({ joinChatRoomList }) => {
  const callback = () => {};
  const allChatRoomList = useSelector(
    (state: RootState) => state.chat.allChatRoomList
  );
  const roomCursorList = useSelector(
    (state: RootState) => state.chat.roomCursorList
  );
  const joinedChatRoomData = useSelector(
    (state: RootState) => state.chat.joinedChatRoomData
  );
  console.log('roomCursorList= ', roomCursorList);
  console.log('joinedChatRoomData= ', joinedChatRoomData);
  return (
    <St.RoomContainerWrapper>
      {/* <MakeRoom /> */}
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="전체 룸" key="1">
          <div>
            {allChatRoomList?.map((item) => {
              return <Room roomId={item} unreadCount={0} />;
            })}
          </div>
        </TabPane>
        <TabPane tab="내가 참여한 룸" key="2">
          {joinChatRoomList?.map((roomId) => {
            return (
              <Room roomId={roomId} unreadCount={roomCursorList[roomId]} />
            );
          })}
        </TabPane>
      </Tabs>
    </St.RoomContainerWrapper>
  );
};

export default RoomContainer;
