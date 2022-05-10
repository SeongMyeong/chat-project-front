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
  const router = useRouter();
  const dispatch = useDispatch();
  const [msg, setMsg] = useState('');
  const [userCount, setUserCount] = useState(0);
  //const [messages, setMessages] = useState([{}]);
  const [recieveMsg, setRecieveMsg] = useState('');
  // const [socket, setSocket] = useState(null);
  const socket = useSelector((state: RootState) => state.chat.socket);
  const previousRoomId = usePrevious(router.query?.room_id);
  console.log('router.aspath', router);
  // const [allChatRoomList, setAllChatRoomList] = useState([]);
  // const [joinChatRoomList, setJoinChatRoomList] = useState([]);
  const callback = () => {};

  // useEffect(() => {
  //   const fecthAllChatRoom = async () => {
  //     const res = await getAllChatRoomList();
  //     const { data, status } = res;
  //     dispatch(chatActions.setAllChatRoomList(data.result));
  //   };
  //   const fetchJoinChatRoom = async () => {
  //     try {
  //       const res = await getJoinChatRoomList({ id: myInfo?.id });
  //       const { data, status } = res;
  //       dispatch(chatActions.setJoinChatRoomList(data.result));
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };
  //   fecthAllChatRoom();
  //   if (myInfo?.id) {
  //     fetchJoinChatRoom();
  //   }
  // }, []);
  // const flag2 = React.useRef(false);
  // useEffect(() => {
  //   const getMessage = async (roomId: string) => {
  //     if (roomId) {
  //       const { data, status } = await getChatMessage({
  //         roomId,
  //         id: myInfo?.id
  //       });
  //       if (data && status === 200) {
  //         dispatch(
  //           chatActions.setMessagesInit({
  //             roomId,
  //             messages: data.data
  //           })
  //         );
  //         if (joinedChatRoomData) {
  //           const temp = joinedChatRoomData.slice();
  //           temp[roomId] = data.data;
  //           dispatch(chatActions.setJoinChatRoomData(temp));
  //         }
  //       }
  //     }
  //   };

  //   getMessage(router.query?.room_id as string);
  // }, [router.query, joinedChatRoomData]);

  //"CHAT_MESSAGE:dsa:3:a5a0cdc1-a638-4932-807a-ba9e3a239026:Nathan"
  useEffect(() => {
    /* 룸 접속 */
    if (socket && router.query.room_id) {
      console.log('[SEO] JOIN_ROOM = ', socket);
      socket.emit(SOCKET_EVENT.JOIN_ROOM, { room_id: router.query.room_id });

      const fecth = async () => {
        await joinChatRoom({ room_id: router.query.room_id, id: myInfo?.id });
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
    console.log('[seo][test] temp ', temp);
    joinChatRoomList.forEach((item) => {
      if (!temp[item]) temp[item] = [];
      else temp[item] = temp[item];
    });
    joinedChatRoomDataRef.current = temp;
  }, [joinChatRoomList]);

  const isFecthing = React.useRef(false);
  useEffect(() => {
    console.log('[seo] previousRoomId ', previousRoomId);
    console.log('[seo] router.query?.room_id ', router.query?.room_id);
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
          console.log('[seo] temp !', temp);
          console.log('[seo] data.data !', data.data);
          //setJoinedChatRoomData(temp);
          joinedChatRoomDataRef.current = temp;
          dispatch(
            chatActions.setMessagesInit({
              roomId,
              messages: data.data
            })
          );
          /* 데이터 받자마자 룸 커서 세팅 */
          dispatch(
            chatActions.setRoomCursor({
              roomId,
              currentCursor: data.data.length
            })
          );
          dispatch(chatActions.setJoinChatRoomData(temp));
        }
      }
    };
    getMessage();
  }, [router.query]);
  // useEffect(() => {

  // },[joinedChatRoomDataRef.current])

  // useEffect(() => {
  //   const getMessage = async (roomId: string) => {
  //     if (roomId) {
  //       const { data, status } = await getChatMessage({
  //         roomId,
  //         id: myInfo?.id
  //       });
  //       if (data && status === 200) {
  //         joinedChatRoomData[roomId] = data.data;
  //         dispatch(
  //           chatActions.setMessagesInit({
  //             roomId,
  //             messages: data.data
  //           })
  //         );
  //       }
  //     }
  //   };

  //   getMessage(router.query?.room_id as string);
  // }, [router.query, joinedChatRoomData]);
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

  console.log('[seo][test] joinedChatRoomData = ', joinedChatRoomData);
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
