/* Filter + image 통합 test */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {
  number: 0
};

const test = createSlice({
  name: 'test',
  initialState,
  reducers: {
    setNumber(state, action: PayloadAction<any>) {
      state.number = action.payload;
    }
  }
});
export const testActions = { ...test.actions };

export default test;
