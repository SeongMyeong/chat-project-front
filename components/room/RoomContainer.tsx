import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Room from 'components/room/Room';
import MakeRoom from 'components/room/MakeRoom';
import {
  getAllChatRoomList,
  getJoinChatRoomList,
  joinChatRoom,
  leaveChatRoom
} from 'lib/api/room';
import { Tabs } from 'antd';

const St = {
  RoomContainerWrapper: styled.div`
    padding: 0px 20px;
    width: 200px;
  `
};
const { TabPane } = Tabs;

const RoomContainer = ({ roomId, allChatRoomList, joinChatRoomList }) => {
  const callback = () => {};
  const getAllChatRoom = async () => {
    const res = await getAllChatRoomList();
    console.log(res);
  };
  const getJoinChatRoom = async () => {
    const res = await getJoinChatRoomList({ id: 'test' });
    console.log(res);
  };

  const handleJoinChatRoom = async () => {
    const res = await joinChatRoom({ room_id: roomId, id: 'test' });
    console.log(res);
  };

  const handleLeaveChatRoom = async () => {
    const res = await leaveChatRoom({ room_id: roomId, id: 'test' });
    console.log(res);
  };
  return (
    <St.RoomContainerWrapper>
      <MakeRoom />
      {/* <div>
        <MakeRoom />
        <button onClick={getAllChatRoom}>모든 채팅룸 가져오기</button>
        <button onClick={getJoinChatRoom}>
          현재 들어가있는 채팅방 가져오기
        </button>
        <button onClick={handleJoinChatRoom}>방 들어가기</button>
        <button onClick={handleLeaveChatRoom}>방 나가기</button>
      </div> */}
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="전체 룸" key="1">
          <div>
            {allChatRoomList?.map((item) => {
              return <Room roomId={item} />;
            })}
          </div>
        </TabPane>
        <TabPane tab="내가 참여한 룸" key="2">
          {joinChatRoomList?.map((item) => {
            return <Room roomId={item} />;
          })}
        </TabPane>
      </Tabs>
    </St.RoomContainerWrapper>
  );
};

export default RoomContainer;
