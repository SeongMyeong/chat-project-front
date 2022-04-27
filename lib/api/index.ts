import Axios from 'axios'

Axios.defaults.withCredentials = true // front, backend 간 쿠키공유

//import { cacheAdapterEnhancer } from 'axios-extensions';
//axios 정의
const axios = Axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_NODE_ENV === 'production'
      ? process.env.NEXT_PUBLIC_API_URL
      : 'http://localhost:3031',
  //headers: { 'Cache-Control': 'no-cache' }, //커스텅 캐싱을 원할 경우 no-cache
  // adapter: cacheAdapterEnhancer(
  //   Axios.defaults.adapter,
  //   { enabledByDefault: false }
  //   //enabledByDefault false <=  모든 네트워크 요청에 캐싱된 데이터 사용 x
  // ),
  timeout: 3000
})

export default axios
