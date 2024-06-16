import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";
import axios from "axios";
import { useEffect, useState } from "react";

const Header = ({ subtitle }) => {
  const [userdata, setUserdata] = useState({});
  const getUser = async () => {
    try {
      const response = await axios.get(`http://${process.env.SERVER_URL}/login/sucess`, {
        withCredentials: true,
      });

      setUserdata(response.data.user);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box mb="30px">
      <Typography
        variant="h2"
        color={colors.grey[100]}
        fontWeight="bold"
        sx={{ m: "0 0 5px 0" }}
      >
        Hello , {userdata?.displayName}
      </Typography>
      <Typography variant="h5" color="grey">
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
