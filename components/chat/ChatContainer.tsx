import React, { useState, useEffect } from 'react';
import ChatMessage from 'components/chat/ChatMessage';
import styled from 'styled-components';
import { leaveChatRoom } from 'lib/api/room';
import { SOCKET_EVENT } from 'lib/constants';
import { faker } from '@faker-js/faker';
import { useRouter } from 'next/router';
import { useSelector, RootState } from 'store';
import { Button } from 'antd';

const St = {
  ChatContainer: styled.div`
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    border-radius: 8px;
    padding: 15px;
  `
};

const ChatContainer = ({ messages, roomId, id, name }) => {
  const router = useRouter();
  const socket = useSelector((state: RootState) => state.chat.socket);

  const handleLeave = async () => {
    const res = await leaveChatRoom({
      room_id: roomId,
      id
    });
    socket.emit(SOCKET_EVENT.LEAVE_ROOM, {
      room_id: roomId,
      id,
      user_name: name
    });
    router.push('/chat/room');
  };

  return (
    <St.ChatContainer id="chat-container">
      <Button onClick={handleLeave}> 방나가기 </Button>
      <span>현재 방 {roomId} </span>
      <ul id="messages" style={{ paddingLeft: '10px' }}>
        {messages?.map((messageInfo, index) => (
          <ChatMessage messageInfo={messageInfo} key={index} id={id} />
        ))}
      </ul>
    </St.ChatContainer>
  );
};
export default ChatContainer;
