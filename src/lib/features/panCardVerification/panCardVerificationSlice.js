import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { panCardVerification } from "./panCardVerificationApi";

const initialState = {
  status: "idle",
  panCardDetails: {},
  error: null,
};

export const panCardVerificationAsync = createAsyncThunk(
  "pancard/verification",
  async (pancardNumber) => {
    try {
      const response = await panCardVerification(pancardNumber);
      return response;
    } catch (error) {
      return error;
    }
  }
);

const pancardVerificationSlice = createSlice({
  name: "pancard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(panCardVerificationAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(panCardVerificationAsync.fulfilled, (state, action) => {
        state.status = "idle";
        if (action.payload) {
          state.panCardDetails = action.payload;
        }
      })
      .addCase(panCardVerificationAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      });
  },
});

export const getPanCardDetails = (state) => state.pancard.panCardDetails;
export const loadingStatusOfPan = (state) => state.pancard.status;
export default pancardVerificationSlice.reducer;
