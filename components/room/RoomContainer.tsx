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

const { TabPane } = Tabs;

const RoomContainer = () => {
  const [allChatRoomList, setAllChatRoomList] = useState([]);
  const [joinChatRoomList, setJoinChatRoomList] = useState([]);
  const callback = () => {};
  useEffect(() => {
    const fecthAllChatRoom = async () => {
      const res = await getAllChatRoomList();
      const { data, status } = res;
      setAllChatRoomList(data.result);
    };
    const fetchJoinChatRoom = async () => {
      const res = await getJoinChatRoomList({ id: 'test' });
      const { data, status } = res;
      setJoinChatRoomList(data.result);
    };
    fecthAllChatRoom();
    fetchJoinChatRoom();
  }, []);

  const getAllChatRoom = async () => {
    const res = await getAllChatRoomList();
    console.log(res);
  };
  const getJoinChatRoom = async () => {
    const res = await getJoinChatRoomList({ id: 'test' });
    console.log(res);
  };

  const handleJoinChatRoom = async () => {
    const res = await joinChatRoom({ room_id: '1', id: 'test' });
    console.log(res);
  };

  const handleLeaveChatRoom = async () => {
    const res = await leaveChatRoom({ room_id: '1', id: 'test' });
    console.log(res);
  };
  return (
    <>
      <MakeRoom />
      <button onClick={getAllChatRoom}>모든 채팅룸 가져오기</button>
      <button onClick={getJoinChatRoom}>현재 들어가있는 채팅방 가져오기</button>
      <button onClick={handleJoinChatRoom}>방 들어가기</button>
      <button onClick={handleLeaveChatRoom}>방 나가기</button>
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
    </>
  );
};

export default RoomContainer;
