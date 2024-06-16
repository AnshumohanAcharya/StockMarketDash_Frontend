// src/scenes/dashboard/index.js
import {
  Box,
  Button,
  Divider,
  Typography,
  useTheme,
} from '@mui/material';
import { tokens } from '../../theme';
import Header from '../../components/Header';
import LineChart from '../../components/LineChart';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
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
  const logout = () => {
    window.open(`http://${process.env.SERVER_URL}/logout`, "_self");
  };
  useEffect(() => {
    getUser();
  }, []);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const today = format(new Date(), 'EEEE, MMMM d');

  const sectors = [
    'All sectors',
    'Industrials',
    'Communication Services',
    'Technology',
    'Consumer Cyclical',
    'Financial',
    'Healthcare',
    'Real Estate',
    'Basic Materials',
    'Utilities',
    'Energy',
    'Consumer Defensive',
  ];

  const dataSectors = {
    'All sectors': 0.88,
    'Industrials': 1.66,
    'Communication Services': 1.55,
    'Technology': 1.08,
    'Consumer Cyclical': 1.02,
    'Financial': 0.99,
    'Healthcare': 0.84,
    'Real Estate': 0.69,
    'Basic Materials': 0.65,
    'Utilities': 0.57,
    'Energy': -0.05,
    'Consumer Defensive': -0.12,
  };

  const halfIndex = Math.ceil(sectors.length / 2);
  const firstHalfSectors = sectors.slice(0, halfIndex);
  const secondHalfSectors = sectors.slice(halfIndex);

  return (
    <Box m='20px'>
      {/* HEADER */}
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <Header subtitle={today} />
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display='grid'
        gridTemplateColumns='repeat(12, 1fr)'
        gap='20px'
        sx={{
          '@media (max-width: 1200px)': {
            gridTemplateColumns: 'repeat(6, 1fr)',
          },
          '@media (max-width: 600px)': {
            gridTemplateColumns: 'repeat(12, 1fr)',
          },
        }}
      >
        {/* ROW 1 */}
        
        <Box
          gridColumn={{ xs: 'span 12', sm: 'span 6' }}
          backgroundColor="#1E1E1E"
          display='flex'
          flexDirection='column'
          alignItems='flex-start'
          p='20px'
        >
          <Box display='flex' alignItems='center' mb='20px'>
            <Button
              variant='outlined'
              sx={{
                color: 'white',
                textTransform: 'none',
                mr: '10px',
                p: "10px",
                font: 'inherit',
              }}
            >
              The markets are{' '}
              <span
                style={{
                  color: colors.greenAccent[600],
                  fontWeight: 'bold',
                  padding: '0 5px',
                }}
              >
                bullish
              </span>
            </Button>
          </Box>
          <Typography variant='body1' color="#FFF">
            Stock prices have risen steadily over the past week, indicating a
            positive sentiment among investors.
          </Typography>
        </Box>

        {/* ROW 1 - Sector Performance */}
        <Box
          gridColumn={{ xs: 'span 12', sm: 'span 6' }}
          backgroundColor="#1E1E1E"
          display='flex'
          flexDirection='column'
          p='20px'
          minHeight='300px'
        >
          <Typography
            variant='h5'
            fontWeight='600'
            color="#FFF"
            mb='20px'
          >
            Sector Performance
          </Typography>
          <Box display='grid' gridTemplateColumns='1fr 1fr' gap='20px'>
            <Box>
              {firstHalfSectors.map((sector) => {
                const change = dataSectors[sector];
                const isPositive = parseFloat(change) > 0;
                return (
                  <Box key={sector} mb='10px'>
                    <Box
                      display='flex'
                      justifyContent='space-between'
                      width='100%'
                    >
                      <Typography
                        variant='body1'
                        color="#FFF"
                        noWrap
                      >
                        {sector}
                      </Typography>
                      <Typography
                        variant='body1'
                        sx={{
                          color: isPositive
                            ? colors.greenAccent[600]
                            : colors.redAccent[600],
                        }}
                      >
                        {change}%
                      </Typography>
                    </Box>
                    <Divider
                      sx={{
                        backgroundColor: colors.grey[800],
                        marginTop: '10px',
                      }}
                    />
                  </Box>
                );
              })}
            </Box>
            <Box>
              {secondHalfSectors.map((sector) => {
                const change = dataSectors[sector];
                const isPositive = parseFloat(change) > 0;
                return (
                  <Box key={sector} mb='10px'>
                    <Box
                      display='flex'
                      justifyContent='space-between'
                      width='100%'
                    >
                      <Typography
                        variant='body1'
                        color="#FFF"
                        noWrap
                      >
                        {sector}
                      </Typography>
                      <Typography
                        variant='body1'
                        sx={{
                          color: isPositive
                            ? colors.greenAccent[600]
                            : colors.redAccent[600],
                        }}
                      >
                        {change}%
                      </Typography>
                    </Box>
                    <Divider
                      sx={{
                        backgroundColor: colors.grey[800],
                        marginTop: '10px',
                      }}
                    />
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn='span 12'
          display='flex'
          flexDirection='column'
          p='20px'
        >
          <Typography
            variant='h5'
            fontWeight='600'
            color={colors.grey[100]}
            mb='20px'
          >
            Stock Price Chart
          </Typography>
          <Box height='250px'>
            <LineChart isDashboard={true} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
