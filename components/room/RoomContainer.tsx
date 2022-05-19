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
    background: #191919;
  `
};
const { TabPane } = Tabs;

const RoomContainer = ({ allChatRoomList, joinChatRoomList }) => {
  const callback = () => {};
  const roomCursorList = useSelector(
    (state: RootState) => state.chat.roomCursorList
  );

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
