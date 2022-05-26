/* Filter + image 통합 test */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatReduxState } from 'types';

// export const getDatasThunk = createAsyncThunk(
//   'board/getDatas',
//   // eslint-disable-next-line consistent-return
//   async (_, thunkAPI) => {
//     try {
//       const response = await getDatas();
//       const datas = response.data;
//       return datas;
//     } catch (error) {
//       return thunkAPI.rejectWithValue({ error: error.message });
//     }
//   },
// );

const initialState: ChatReduxState = {
  socket: '',
  roomId: '',
  roomList: [],
  messages: [],
  allChatRoomList: [],
  joinChatRoomList: [],
  roomCursor: [],
  joinedChatRoomData: [],
  roomCursorList: [],
  roomRecentMessageList: []
};

const chat = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setRoomId(state, action: PayloadAction<string>) {
      state.roomId = action.payload;
    },
    setSocket(state, action: PayloadAction<any>) {
      //state.myPageTabKey = action.payload;
      state.socket = action.payload;
    },
    setRoomList(state, action: PayloadAction<any[]>) {
      state.roomList = action.payload;
    },
    setMessages(state, action: PayloadAction<any>) {
      //console.log('[seo] setMessages ', action.payload.room_id, action.payload);
      const joinedChatRoomData = { ...state.joinedChatRoomData };
      const roomId = action.payload.room_id;
      const currentCursor = action.payload.current_cursor;

      if (joinedChatRoomData[roomId]) {
        const myRoomCursor = joinedChatRoomData[roomId].length;
        const unreadCount = currentCursor - myRoomCursor;
        let roomCursorList = { ...state.roomCursorList };
        //[room_id] : unreadCount
        roomCursorList[roomId as string] = unreadCount;
        state.roomCursorList = roomCursorList;
      }

      /* 현재 방이면 메세지 추가 */
      if (action.payload.room_id === state.roomId) {
        const messages = state.messages.slice();
        messages.push(action.payload);
        state.messages = messages;

        /* 추가  */
        joinedChatRoomData[action.payload.room_id] = messages;
        state.joinedChatRoomData = joinedChatRoomData;
        //룸커서 리스트 초기화
        let roomCursorList = { ...state.roomCursorList };
        roomCursorList[roomId as string] = 0;
        state.roomCursorList = roomCursorList;
      }
    },
    // 메세지 및 룸 메세지 초기화
    setMessagesInit(state, action) {
      state.messages = action.payload.messages;
      const roomId = action.payload.room_id;
      //룸커서 리스트 초기화
      let roomCursorList = { ...state.roomCursorList };
      roomCursorList[roomId as string] = 0;
      state.roomCursorList = roomCursorList;
    },
    setAllChatRoomList(state, action: PayloadAction<any[]>) {
      state.allChatRoomList = action.payload;
    },
    setJoinChatRoomList(state, action: PayloadAction<any[]>) {
      state.joinChatRoomList = action.payload;
      // action.payload.forEach((roomId) => {
      //   console.log('[seo] state.joinedChatRoomData[roomId] ', roomId);
      //   if (state.joinedChatRoomData[roomId]?.length === 0) {
      //     state.joinedChatRoomData[roomId] = [];
      //   }
      // });
    },
    setJoinChatRoomData(state, action: PayloadAction<any[]>) {
      state.joinedChatRoomData = action.payload;
    }
  },
  extraReducers(builder) {
    /*------------------------------------------------------ */
    // builder.addCase(getDatasThunk.pending, (state) => {
    //   state.isDatasDone = false;
    //   state.isDatasError = null;
    //   state.datas = [];
    // });
    // builder.addCase(
    //   getDatasThunk.fulfilled,
    //   (state, action: PayloadAction<GetDatasRes>) => {
    //     state.isDatasDone = true;
    //     state.isDatasError = null;
    //     state.datas = action.payload.cardList;
    //   }
    // );
    // builder.addCase(getDatasThunk.rejected, (state, action) => {
    //   state.isDatasDone = false;
    //   state.isDatasError = action.error.message;
    //   state.datas = [];
    // });
  }
});
export const chatActions = { ...chat.actions };

export default chat;
