import { useEffect } from 'react';
import styled from 'styled-components';
import Room from 'components/room/Room';
import MakeRoom from 'components/room/MakeRoom';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

const RoomContainer = () => {
  const callback = () => {};
  useEffect(() => {}, []);
  return (
    <>
      <MakeRoom />
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="전체 룸" key="1">
          <div>
            <Room roomId="1" />
            <Room roomId="2" />
            <Room roomId="3" />
            <Room roomId="4" />
            <Room roomId="5" />
          </div>
        </TabPane>
        <TabPane tab="내가 참여한 룸" key="2">
          Content of Tab Pane 2
        </TabPane>
      </Tabs>
    </>
  );
};

export default RoomContainer;
