import React, { useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { io } from 'socket.io-client';
import { SOCKET_EVENT } from 'lib/constants';
import RoomContainer from 'components/room/RoomContainer';
import RoomHeader from 'components/room/RoomHeader';
import ChatContainer from 'components/chat/ChatContainer';
import { chatActions } from 'store/chat';
import modal, { modalActions } from 'store/modal';
import { getChatMessage } from 'lib/api/chat';
import MakeRoom from 'components/room/MakeRoom';
import {
  getAllChatRoomList,
  getJoinChatRoomList,
  joinChatRoom,
  leaveChatRoom
} from 'lib/api/room';
import ProjectInformation from 'components/project/ProjectInformation';
import usePrevious from 'hooks/usePrevious';
import styled from 'styled-components';
import { useSelector, RootState } from 'store';
import { Button, Input } from 'antd';

const St = {
  ChatContainerWrapper: styled.div`
    width: 1280px;
    overflow: hidden;
    height: calc(100vh - 40px);
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
  const modal = useSelector((state: RootState) => state.modal.modal);
  const router = useRouter();
  const dispatch = useDispatch();
  const [msg, setMsg] = useState('');
  const socket = useSelector((state: RootState) => state.chat.socket);
  const previousRoomId = usePrevious(router.query?.room_id);
  const callback = () => {};

  const [memberList, setMemberList] = useState();
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
        try {
          const res = await joinChatRoom({
            room_id: router.query.room_id,
            id: myInfo?.id,
            user_name: myInfo?.name
          });
          const { result } = res.data;
          console.log('[seo] joinChatRoom res = ', res);
          setMemberList(result);
        } catch (e) {
          console.log(e);
        }
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
    if (msg === '') return;
    socket.emit('message', {
      room_id: router.query.room_id,
      id: myInfo?.id,
      message: msg,
      time: '',
      user_name: myInfo?.name
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
    // 하단부로 내리기
    const chatCotainer = document.getElementById('chat-container');
    console.log('chatCotainer ', chatCotainer);
    chatCotainer.scrollTo(0, chatCotainer.scrollHeight);
  }, [messages]);

  const handleProjectModal = async () => {
    dispatch(modalActions.setModal({ ...modal, type: 'project' }));
    dispatch(modalActions.openModal());
  };
  return (
    <div className="flex" style={{ height: '100%' }}>
      <RoomContainer
        allChatRoomList={allChatRoomList}
        joinChatRoomList={joinChatRoomList}
      />
      {/* <button onClick={handleProjectModal}>모달</button> */}
      {/* <MakeRoom /> */}
      <div className="flex-column">
        <St.ChatContainerWrapper>
          <RoomHeader title={''} memberList={memberList} id={myInfo?.id} />
          <ChatContainer
            messages={messages}
            roomId={router.query.room_id}
            id={myInfo?.id}
            name={myInfo?.name}
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
      <div>
        <div>해당 프로젝트 info</div>
        <div>
          <ProjectInformation />
        </div>
      </div>
    </div>
  );
};
export default Roompage;
