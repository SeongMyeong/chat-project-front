import React, { useMemo, useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { SOCKET_EVENT } from 'lib/constants';
import styled from 'styled-components';

const St = {
  MessageWrapper: styled.li`
    width: 100%;
    border-radius: 16px;
    background: ${(props) => (props.isMe ? '#987eff' : 'white')};
    color: black;
    padding: 10px;
    margin-bottom: 10px;
    word-break: break-all;
    margin: 10px 0;
  `
};
const ChatMessage = ({ messageInfo, id }: any) => {
  const isInfomation = messageInfo?.id === 'information';
  if (isInfomation) {
    return (
      <St.MessageWrapper
        className="flex"
        style={{ background: '#403f3f', color: 'white' }}
      >
        <div className="flex">
          <div>{messageInfo?.message}</div>
        </div>
      </St.MessageWrapper>
    );
  }
  const isMe = messageInfo?.id === id;
  //console.log(' messageInfo?.id ', messageInfo?.id, ' id = ', id);
  if (!messageInfo) return;
  return (
    <St.MessageWrapper className="flex" isMe={isMe}>
      <div className="flex">
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'black',
            marginRight: '5px'
          }}
        ></div>
        <div>
          <div className="flex-space-between">
            <div style={{ fontSize: '13px', color: 'black' }}>
              {messageInfo?.user_name}
            </div>
            {/* <div>{messageInfo?.time}</div> */}
          </div>
          <div>{messageInfo?.message}</div>
        </div>
      </div>
    </St.MessageWrapper>
  );
};

export default React.memo(ChatMessage);
