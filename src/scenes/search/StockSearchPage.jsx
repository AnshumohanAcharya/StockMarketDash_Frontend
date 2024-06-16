import React, { useState } from "react";
import { Box } from "@mui/material";
import SearchStock from "./index";
import LineChart from "../line/SearchLine";

const StockSearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [interval, setInterval] = useState("1d");

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <>
      <Box m={3}>
        <h1>Stock Search Page</h1>
      </Box>
      <Box>
        <SearchStock onSearch={handleSearch} />
        <Box m={3}>
          {searchTerm && <LineChart symbol={searchTerm} interval={interval} />}
        </Box>
      </Box>
    </>
  );
};

export default StockSearchPage;
