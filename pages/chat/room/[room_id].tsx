import React, { useRef, useState, useEffect } from 'react';
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
import usePrevious from 'hooks/usePrevious';
import styled from 'styled-components';
import { useSelector, RootState } from 'store';
import { Button, Input } from 'antd';

const St = {
  ChatContainerWrapper: styled.div`
    width: 100%;
    overflow: hidden;
    height: 90vh;
  `
};
const Roompage = () => {
  const joinedChatRoomDataRef = useRef([]);
  //const [joinedChatRoomData, setJoinedChatRoomData] = useState([]);
  const myInfo = useSelector((state: RootState) => state.auth.myInfo);
  const messages = useSelector((state: RootState) => state.chat.messages);
  const joinedChatRoomData = useSelector(
    (state: RootState) => state.chat.joinedChatRoomData
  );
  const allChatRoomList = useSelector(
    (state: RootState) => state.chat.allChatRoomList
  );
  const joinChatRoomList = useSelector(
    (state: RootState) => state.chat.joinChatRoomList
  );
  const roomCursorList = useSelector(
    (state: RootState) => state.chat.roomCursorList
  );
  const router = useRouter();
  const dispatch = useDispatch();
  const [msg, setMsg] = useState('');
  const socket = useSelector((state: RootState) => state.chat.socket);
  const previousRoomId = usePrevious(router.query?.room_id);
  const callback = () => {};

  const [memberCount, setMemberCount] = useState();
  //"CHAT_MESSAGE:dsa:3:a5a0cdc1-a638-4932-807a-ba9e3a239026:Nathan"
  useEffect(() => {
    /* 룸 접속 */
    if (socket && router.query.room_id && myInfo.id) {
      socket.emit(SOCKET_EVENT.JOIN_ROOM, {
        room_id: router.query.room_id,
        id: myInfo?.id,
        user_name: myInfo?.name
      });
      const fecth = async () => {
        const res = await joinChatRoom({
          room_id: router.query.room_id,
          id: myInfo?.id
        });
        const { result } = res.data;
        console.log('[seo] joinChatRoom res = ', res);
        setMemberCount(result);
      };
      fecth();
    }
    const fetchJoinChatRoom = async () => {
      const res = await getJoinChatRoomList({ id: myInfo?.id });
      const { data, status } = res;
      dispatch(chatActions.setJoinChatRoomList(data.result));
    };
    if (myInfo?.id) {
      fetchJoinChatRoom();
    }
    /* 현재 들어간 룸 id  */
    dispatch(chatActions.setRoomId(router.query?.room_id as string));
  }, [router.query, socket, myInfo]);

  useEffect(() => {
    const temp = { ...joinedChatRoomDataRef.current };

    joinChatRoomList.forEach((item) => {
      if (!temp[item]) temp[item] = [];
      else temp[item] = temp[item];
    });
    joinedChatRoomDataRef.current = temp;
  }, [joinChatRoomList]);

  const isFecthing = React.useRef(false);
  useEffect(() => {
    if (previousRoomId === router.query?.room_id) return;

    const roomId = router.query?.room_id as string;
    const getMessage = async () => {
      if (roomId) {
        const { data, status } = await getChatMessage({
          roomId,
          id: myInfo?.id
        });
        if (data && status === 200) {
          const temp = { ...joinedChatRoomDataRef.current };
          temp[roomId] = data.data;

          //setJoinedChatRoomData(temp);
          joinedChatRoomDataRef.current = temp;
          dispatch(
            chatActions.setMessagesInit({
              room_id: roomId,
              messages: data.data
            })
          );
          dispatch(chatActions.setJoinChatRoomData(temp));
        }
      }
    };
    getMessage();
  }, [router.query]);

  const sendMessage = (e: any) => {
    e.preventDefault();
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
    //console.log('chatCotainer ', chatCotainer);
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

  return (
    <div className="flex">
      <RoomContainer
        allChatRoomList={allChatRoomList}
        joinChatRoomList={joinChatRoomList}
      />

      <St.ChatContainerWrapper id="chat-container">
        <div>채팅 멤버 {memberCount}</div>
        <ChatContainer
          messages={messages}
          roomId={router.query.room_id}
          id={myInfo?.id}
        />
      </St.ChatContainerWrapper>
      <div className="flex" style={{ height: '32px' }}>
        <Input
          id="msginput"
          autoComplete="off"
          type="text"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <Button onClick={sendMessage}>전송</Button>
      </div>
    </div>
  );
};
export default Roompage;
