import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { io } from 'socket.io-client';
import { SOCKET_EVENT } from 'lib/constants';
import styled from 'styled-components';
import ChatMessage from 'components/chat/ChatMessage';
import RoomContainer from 'components/room/RoomContainer';
import { faker } from '@faker-js/faker';
const St = {
  ChatContainer: styled.div`
    width: 500px;
    border: 1px solid gray;
    border-radius: 8px;
  `
};
const Roompage = () => {
  const router = useRouter();

  const [id, setId] = useState(faker.datatype.uuid());
  const [name, setName] = useState(faker.name.firstName());
  const [msg, setMsg] = useState('');
  const [userCount, setUserCount] = useState(0);
  const [messages, setMessages] = useState([{}]);
  const [recieveMsg, setRecieveMsg] = useState('');
  const [socket, setSocket] = useState(null);

  console.log('router.aspath', router);
  useEffect(() => {
    const socketIo = io('http://localhost:3000/room', {
      query: {
        room_id: router.query.room_id
      }
    });
    setSocket(socketIo);
    function cleanup() {
      if (socketIo) socketIo.disconnect();
    }
    return cleanup;
    // should only run once and not on every re-render,
    // so pass an empty array
  }, [router.query]);
  const sendMessage = (e: any) => {
    e.preventDefault();
    console.log('[masonms] sendMessage: ', msg, id, name);

    socket.emit('message', {
      room_id: router.query.room_id,
      id: id,
      message: msg,
      time: '',
      user_name: name
    });
    setMsg('');
  };

  /* 엔터버튼 클릭시 인풋  */
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const dir = event.keyCode;
      if (dir === 13) sendMessage(event);
    };

    window.addEventListener('keydown', handleKeyDown, false);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [sendMessage]);

  useEffect(() => {
    if (socket)
      socket.on(SOCKET_EVENT.USER_COUNT, (count) => {
        setUserCount(count);
      });
  }, [socket]);

  useEffect(() => {
    if (socket) {
      socket.on(SOCKET_EVENT.MESSAGE, (msg) => {
        console.log('[seo] , ', msg);
        setMessages([...messages, msg]);
      });
    }
  }, [socket, messages]);

  console.log('messages= ', messages);
  return (
    <div className="flex">
      <RoomContainer />
      <St.ChatContainer>
        {userCount}
        <ul id="messages">
          {messages?.map((messageInfo, index) => (
            <ChatMessage messageInfo={messageInfo} key={index} id={id} />
          ))}
          <li id="usercount" />
        </ul>
        <input
          id="msginput"
          autoComplete="off"
          type="text"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button type="button" onClick={sendMessage}>
          전송
        </button>
      </St.ChatContainer>
    </div>
  );
};
export default Roompage;
