import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { faker } from '@faker-js/faker';
import { authActions } from 'store/auth';
import 'styles/index.css';
import 'antd/dist/antd.css';
import { wrapper } from 'store';
import useSocket from 'hooks/useSocket';
import Layout from 'components/base/Layout';
import { SOCKET_EVENT } from 'lib/constants';
import { chatActions } from 'store/chat';
import { io } from 'socket.io-client';
import { useSelector, RootState } from 'store';
import { getAllChatRoomList, getJoinChatRoomList } from 'lib/api/room';
//const socketIo = io('http://localhost:5001/room');

function MyApp({ Component, pageProps }: any) {
  const dispatch = useDispatch();
  const myInfo = useSelector((state: RootState) => state.auth.myInfo);

  // useSocket();
  useEffect(() => {
    //alert('hello');
    //const socketIo = io('http://localhost:5001/room');
    const socketIo = io(`${process.env.NEXT_PUBLIC_DEV_CHAT_HOST}/room`);
    console.log('socketIo connection= ', socketIo);
    dispatch(chatActions.setSocket(socketIo));

    socketIo.on(SOCKET_EVENT.MESSAGE, (msg) => {
      console.log('SOCKET_EVENT.MESSAGE ', msg);
      dispatch(chatActions.setMessages(msg));
    });

    socketIo.on(SOCKET_EVENT.ROOM_CURSOR, (msg) => {
      // console.log('SOCKET_EVENT.ROOM_CURSORmsg = ', msg);
    });

    socketIo.on(SOCKET_EVENT.LEAVE_ROOM, (msg) => {});

    socketIo.on(SOCKET_EVENT.JOIN_ROOM, (msg) => {
      console.log('[seo] JOIN_ROOM ', msg);
      const fecthAllChatRoom = async () => {
        const res = await getAllChatRoomList();
        const { data, status } = res;
        dispatch(chatActions.setAllChatRoomList(data.result));
      };
      fecthAllChatRoom();
    });
    socketIo.on(SOCKET_EVENT.CREATE_ROOM, (msg) => {
      console.log('[seo] CREATE_ROOM ', msg);
      const fecthAllChatRoom = async () => {
        const res = await getAllChatRoomList();
        const { data, status } = res;
        dispatch(chatActions.setAllChatRoomList(data.result));
      };
      fecthAllChatRoom();
    });
  }, []);

  useEffect(() => {
    const fecthAllChatRoom = async () => {
      const res = await getAllChatRoomList();
      const { data, status } = res;
      dispatch(chatActions.setAllChatRoomList(data.result));
    };
    fecthAllChatRoom();
  }, []);

  useEffect(() => {
    const fetchJoinChatRoom = async () => {
      const res = await getJoinChatRoomList({ id: myInfo?.id });
      const { data, status } = res;
      dispatch(chatActions.setJoinChatRoomList(data.result));
    };
    if (myInfo?.id) {
      fetchJoinChatRoom();
    }
  }, [myInfo]);

  useEffect(() => {
    dispatch(
      authActions.setMyInfo({
        id: faker.datatype.uuid(),
        name: faker.name.firstName()
      })
    );
  }, []);
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default wrapper.withRedux(MyApp);
