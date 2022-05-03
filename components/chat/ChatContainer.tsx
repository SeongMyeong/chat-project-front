import React, { useState, useEffect } from 'react';
import ChatMessage from 'components/chat/ChatMessage';
import styled from 'styled-components';
import { leaveChatRoom } from 'lib/api/room';
import { SOCKET_EVENT } from 'lib/constants';
import { faker } from '@faker-js/faker';
import { useRouter } from 'next/router';
import { useSelector, RootState } from 'store';

const St = {
  ChatContainer: styled.div`
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    border-radius: 8px;
  `
};

const ChatContainer = ({ messages, roomId, id }) => {
  const router = useRouter();
  const socket = useSelector((state: RootState) => state.chat.socket);

  const handleLeave = async () => {
    const res = await leaveChatRoom({
      room_id: roomId,
      id
    });
    socket.emit(SOCKET_EVENT.LEAVE_ROOM, [roomId]);
    router.push('/chat/room');
    console.log(res);
  };

  console.log('ChatMessage = ', messages);
  return (
    <St.ChatContainer>
      {/* <button type="button" onClick={handleLeave}>
        나가기
      </button> */}
      <ul id="messages">
        {messages?.map((messageInfo, index) => (
          <ChatMessage messageInfo={messageInfo} key={index} id={id} />
        ))}
      </ul>
    </St.ChatContainer>
  );
};
export default ChatContainer;
