import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { io } from 'socket.io-client';
import { SOCKET_EVENT } from 'lib/constants';
import styled from 'styled-components';
import ChatMessage from 'components/chat/ChatMessage';
import RoomContainer from 'components/room/RoomContainer';
import { chatActions } from 'store/chat';
import { getChatMessage } from 'lib/api/chat';
import { leaveChatRoom } from 'lib/api/room';
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
  const dispatch = useDispatch();
  const [id, setId] = useState(faker.datatype.uuid());
  const [name, setName] = useState(faker.name.firstName());
  const [msg, setMsg] = useState('');
  const [userCount, setUserCount] = useState(0);
  const [messages, setMessages] = useState([{}]);
  const [recieveMsg, setRecieveMsg] = useState('');
  const [socket, setSocket] = useState(null);

  console.log('router.aspath', router);
  //"CHAT_MESSAGE:dsa:3:a5a0cdc1-a638-4932-807a-ba9e3a239026:Nathan"
  useEffect(() => {
    const getMessage = async (roomId: string) => {
      if (roomId) {
        const { data, status } = await getChatMessage({
          roomId,
          currentCursor: ''
        });
        if (data && status === 200) {
          setMessages(data.data);
        }
        // setMessages([{ message }]);
      }
    };
    const socketIo = io('http://localhost:5001/room', {
      query: {
        room_id: router.query.room_id
      }
    });
    setSocket(socketIo);
    dispatch(chatActions.setSocket(socketIo));

    socketIo.emit(SOCKET_EVENT.JOIN_ROOM, {
      room_id: router.query.room_id,
      id: id,
      message: 'JOIN',
      user_name: name
    });

    getMessage(router.query.room_id);

    function cleanup() {
      if (socketIo) {
        // alert('disconnect');
        socketIo.emit(SOCKET_EVENT.LEAVE_ROOM, {
          room_id: router.query.room_id,
          id: id,
          message: 'LEAVE',
          user_name: name
        });

        socketIo.disconnect();
      }
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
    if (socket) {
      socket.on(SOCKET_EVENT.USER_COUNT, (count) => {
        setUserCount(count);
      });
      socket.on(SOCKET_EVENT.LEAVE_ROOM, (msg) => {
        console.log('LEAVE_ROOM');
      });
      socket.on(SOCKET_EVENT.JOIN_ROOM, (msg) => {
        console.log('JOIN_ROOM');
      });
    }
  }, [socket]);

  useEffect(() => {
    if (socket) {
      socket.on(SOCKET_EVENT.MESSAGE, (msg) => {
        console.log('[seo] , ', msg);
        setMessages([...messages, msg.result]);
      });
    }
  }, [socket, messages]);

  const handleLeave = async () => {
    const res = await leaveChatRoom({
      room_id: router.query.room_id,
      id: 'test'
    });
    socket.emit(SOCKET_EVENT.LEAVE_ROOM, [router.query.room_id]);
    router.push('/chat/room');
    console.log(res);
  };
  const testGetChat = async () => {
    const { data, status } = await getChatMessage({
      roomId: '3',
      currentCursor: ''
    });
    setMessages(data.data);
  };

  return (
    <div className="flex">
      <RoomContainer />
      <St.ChatContainer>
        <button type="button" onClick={handleLeave}>
          나가기
        </button>
        <button type="button" onClick={testGetChat}>
          채팅
        </button>
        현재 소켓수 : {userCount}
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
