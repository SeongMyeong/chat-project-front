import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { io } from 'socket.io-client';
import { SOCKET_EVENT } from 'lib/constants';
import RoomContainer from 'components/room/RoomContainer';
import ChatContainer from 'components/chat/ChatContainer';
import { chatActions } from 'store/chat';
import { getChatMessage } from 'lib/api/chat';

import {
  getAllChatRoomList,
  getJoinChatRoomList,
  joinChatRoom,
  leaveChatRoom
} from 'lib/api/room';
import styled from 'styled-components';
import { useSelector, RootState } from 'store';

const St = {
  ChatContainerWrapper: styled.div`
    width: 100%;
    overflow: hidden;
    height: 90vh;
  `
};
const Roompage = () => {
  const myInfo = useSelector((state: RootState) => state.auth.myInfo);

  const router = useRouter();
  const dispatch = useDispatch();
  const [msg, setMsg] = useState('');
  const [userCount, setUserCount] = useState(0);
  const [messages, setMessages] = useState([{}]);
  const [recieveMsg, setRecieveMsg] = useState('');
  // const [socket, setSocket] = useState(null);
  const socket = useSelector((state: RootState) => state.chat.socket);
  console.log('router.aspath', router);
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
      const res = await getJoinChatRoomList({ id: myInfo?.id });
      const { data, status } = res;
      setJoinChatRoomList(data.result);
    };
    fecthAllChatRoom();
    fetchJoinChatRoom();
  }, []);

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
      }
    };
    /* 룸 접속 */
    if (socket && router.query.room_id) {
      console.log('[SEO] JOIN_ROOM = ', socket);
      socket.emit(SOCKET_EVENT.JOIN_ROOM, { room_id: router.query.room_id });

      const fecth = async () => {
        await joinChatRoom({ room_id: router.query.room_id, id: myInfo?.id });
      };
      fecth();
    }

    // const socketIo = io('http://localhost:5001/room', {
    //   query: {
    //     room_id: router.query.room_id
    //   }
    // });
    // setSocket(socketIo);
    // dispatch(chatActions.setSocket(socketIo));

    getMessage(router.query?.room_id as string);
    // function cleanup() {
    //   if (socket) {
    //     // alert('disconnect');
    //     // socketIo.emit(SOCKET_EVENT.LEAVE_ROOM, {
    //     //   room_id: router.query.room_id,
    //     //   id: id,
    //     //   message: 'LEAVE',
    //     //   user_name: name
    //     // });
    //     socket.disconnect();
    //   }
    // }
    // return cleanup;
    // should only run once and not on every re-render,
    // so pass an empty array
  }, [router.query, socket]);

  const sendMessage = (e: any) => {
    e.preventDefault();
    console.log('[seo] sendMessage: ', msg, myInfo?.id, myInfo?.name);

    socket.emit('message', {
      room_id: router.query.room_id,
      id: myInfo?.id,
      message: msg,
      time: '',
      user_name: myInfo?.name
    });
    setMsg('');

    // 하단부로 내리기
    const chatCotainer = document.getElementById('chat-container');
    console.log('chatCotainer ', chatCotainer);
    chatCotainer.scrollTo(0, chatCotainer.scrollHeight);
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

  /* 룸 관련 소켓 useEffect */
  useEffect(() => {
    if (socket) {
      console.log('socketIo = ', socket);
      socket.on(SOCKET_EVENT.MESSAGE, (msg) => {
        console.log('[seo] SOCKET_EVENT.MESSAGE', msg);
        setMessages([...messages, msg.result]);
      });
      socket.on(SOCKET_EVENT.USER_COUNT, (count) => {
        setUserCount(count);
      });
      socket.on(SOCKET_EVENT.LEAVE_ROOM, (msg) => {
        // console.log('LEAVE_ROOM');
        // setMessages([
        //   ...messages,
        //   {
        //     id: 'information',
        //     message: `${msg.user_name}님이 나가셨습니다.`,
        //     room_id: msg.room_id,
        //     user_name: msg.user_name
        //   }
        // ]);
      });
      socket.on(SOCKET_EVENT.JOIN_ROOM, (msg) => {
        console.log('[seo] JOIN_ROOM ', msg);
        const fecthAllChatRoom = async () => {
          const res = await getAllChatRoomList();
          const { data, status } = res;
          setAllChatRoomList(data.result);
        };
        const fetchJoinChatRoom = async () => {
          const res = await getJoinChatRoomList({ id: myInfo?.id });
          const { data, status } = res;
          setJoinChatRoomList(data.result);
        };
        fecthAllChatRoom();
        fetchJoinChatRoom();
      });
    }
  }, [socket, messages]);

  return (
    <div className="flex">
      <RoomContainer
        roomId={router.query.room_id}
        allChatRoomList={allChatRoomList}
        joinChatRoomList={joinChatRoomList}
      />

      <St.ChatContainerWrapper id="chat-container">
        <ChatContainer
          messages={messages}
          roomId={router.query.room_id}
          id={myInfo?.id}
        />
      </St.ChatContainerWrapper>
      <div>
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
      </div>
    </div>
  );
};
export default Roompage;
