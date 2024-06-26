import { configureStore } from "@reduxjs/toolkit";
import { stockApi } from "../services/stockApi";

export default configureStore({
  reducer: { [stockApi.reducerPath]: stockApi.reducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(stockApi.middleware),
});
