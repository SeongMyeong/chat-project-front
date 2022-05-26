export const SOCKET_EVENT = {
  MESSAGE: 'message',
  JOIN_ROOM: 'join room',
  LEAVE_ROOM: 'leave room',
  USER_COUNT: 'usercount',
  ROOM_CURSOR: 'room cursor',
  CREATE_ROOM: 'create room'
};

// message : {
//   room_id : 'test_1',
//   room_cursor : '131', // 현재 방의 커서
// }

// 내가 들어가있는 방이 있는지
//[test_id : '131']

const messages = [
  {
    test_id: [
      {
        message: '',
        id: '',
        user_name: ''
      }
    ]
  }
];
