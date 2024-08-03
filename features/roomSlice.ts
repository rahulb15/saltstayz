import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import {IHotel} from '../models'

export interface HotelState {
  rooms: any[];
}

const initialState: HotelState = {
  rooms: [],
};
export const roomSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    setRooms: (state, action: PayloadAction<{ rooms: any[] }>) => {
      state.rooms = action.payload.rooms;
    },
  },
});

export const { setRooms } = roomSlice.actions;

export default roomSlice.reducer;
