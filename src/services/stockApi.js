import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const stockApiHeaders = {
  "x-rapidapi-key": "18b5443760msh94d0eb1ce8b427ap15af41jsn8d619af8f595",
  "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
};

const baseUrl = "https://apidojo-yahoo-finance-v1.p.rapidapi.com";

const createRequest = (url) => ({ url, headers: stockApiHeaders });

export const stockApi = createApi({
  reducerPath: "stockApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getStockDetails: builder.query({
      query: ({symbol, interval = "1d" } = {}) =>
        createRequest(
          `/stock/v2/get-chart?interval=5m&region=US&symbol=${symbol}&range=${interval}`
        ),
    }),
  }),
});

export const { useGetStockDetailsQuery } = stockApi;

export default stockApi;
