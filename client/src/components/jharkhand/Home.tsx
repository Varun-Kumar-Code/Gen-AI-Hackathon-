import React from 'react';
import { Box, AppBar, Toolbar, Typography } from '@mui/material';
import MapComponent from './MapComponent';

const Home: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Jharkhand Monuments Guide
          </Typography>
        </Toolbar>
      </AppBar>
      <MapComponent />
    </Box>
  );
};

export default Home;