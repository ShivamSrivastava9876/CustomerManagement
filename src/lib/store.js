import { configureStore } from "@reduxjs/toolkit";
import pancardReducer from "./features/panCardVerification/panCardVerificationSlice";
import postcodeReducer from "./features/pincodeData/pincodeDataSlice";

export const store = configureStore({
  reducer: {
    pancard: pancardReducer,
    postcode: postcodeReducer,
  },
});
