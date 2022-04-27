import 'styles/globals.css';
import 'styles/index.css';
import { wrapper } from 'store';
import useSocket from 'hooks/useSocket';
function MyApp({ Component, pageProps }: any) {
  useSocket();
  return <Component {...pageProps} />;
}

export default wrapper.withRedux(MyApp);
