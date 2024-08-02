import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDataByPostcode } from "./pincodeDataApi";

const initialState = {
  status: "idle",
  postcode: "",
  city: "",
  state: "",
  error: null,
};

export const getDataByPostcodeAsync = createAsyncThunk(
  "postcode/getData",
  async (postcode) => {
    try {
      const response = await getDataByPostcode(postcode);
      return response;
    } catch (error) {
      return error;
    }
  }
);

const postcodeSlice = createSlice({
  name: "pancard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDataByPostcodeAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getDataByPostcodeAsync.fulfilled, (state, action) => {
        state.status = "idle";
        if (action.payload) {
            state.city = action.payload.data.city?.length > 0 ? action.payload.data.city[0].name : '';
            state.state = action.payload.data.state?.length > 0 ? action.payload.data.state[0].name : '';

        }
      })
      .addCase(getDataByPostcodeAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      });
  },
});

export const getCityDetails = (state) => state.postcode.city;
export const getStateDetails = (state) => state.postcode.state;
export const loadingStatusOfPostcode = (state) => state.postcode.status;
export default postcodeSlice.reducer;
