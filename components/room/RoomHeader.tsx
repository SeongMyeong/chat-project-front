import React from 'react';
import { Tag, Divider } from 'antd';

const RoomHeader = ({ title, memberList, id }) => {
  console.log('memberList= ', memberList);
  return (
    <div style={{ margin: '10px' }}>
      <div>채팅 멤버 {memberList?.length}</div>
      <div>
        {memberList?.map((item) => {
          return (
            <Tag color={item.id === id ? '#87d068' : ''}>{item.user_name}</Tag>
          );
        })}
      </div>
    </div>
  );
};
export default React.memo(RoomHeader);
