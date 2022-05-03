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

function MyApp({ Component, pageProps }: any) {
  // useSocket();
  useEffect(() => {
    const socketIo = io('http://localhost:5001/room');
    dispatch(chatActions.setSocket(socketIo));
    socketIo.on(SOCKET_EVENT.MESSAGE, (data) => {
      console.log('hello', data);
    });
    // return () => {
    //   if (socketIo) {
    //     socketIo.disconnect();
    //   }
    // };
  }, []);

  const dispatch = useDispatch();
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
