import React from 'react';
import ChatMessage from 'components/chat/ChatMessage';
import styled from 'styled-components';
import { leaveChatRoom } from 'lib/api/room';
import { SOCKET_EVENT } from 'lib/constants';
import { useRouter } from 'next/router';
import { useSelector, RootState } from 'store';
import { Button } from 'antd';

const St = {
  ChatContainer: styled.div`
    width: 100%;
    height: calc(90vh - 40px);
    overflow-y: scroll;
    border-radius: 8px;
    padding: 15px 15px 0 15px;
  `
};

const ChatContainer = ({ messages, roomId, id, name }) => {
  const router = useRouter();
  const socket = useSelector((state: RootState) => state.chat.socket);

  const handleLeave = async () => {
    const res = await leaveChatRoom({
      room_id: roomId,
      id,
      user_name: name
    });
    socket.emit(SOCKET_EVENT.LEAVE_ROOM, {
      room_id: roomId,
      id,
      user_name: name
    });
    router.push('/chat/room');
  };

  return (
    <St.ChatContainer id="chat-container" style={{ height: '' }}>
      <Button onClick={handleLeave}> 방나가기 </Button>
      <span>현재 방 {roomId} </span>
      <ul id="messages" style={{ paddingLeft: '10px', height: '100%' }}>
        {messages?.map((messageInfo, index) => (
          <ChatMessage messageInfo={messageInfo} key={index} id={id} />
        ))}
      </ul>
    </St.ChatContainer>
  );
};
export default ChatContainer;
