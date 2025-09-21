import React from 'react';
import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography
} from '@mui/material';
import {
  LocationOn,
  Store,
  Restaurant,
  Hotel,
  Park,
  Landscape,
  LocalMall
} from '@mui/icons-material';
import { LocationType } from '../types/types';

interface FiltersProps {
  selectedFilters: LocationType[];
  onFilterChange: (filters: LocationType[]) => void;
}

const Filters: React.FC<FiltersProps> = ({ selectedFilters, onFilterChange }) => {
  const handleFilterChange = (
    event: React.MouseEvent<HTMLElement>,
    newFilters: LocationType[]
  ) => {
    onFilterChange(newFilters);
  };

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 80,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1,
        backgroundColor: 'white',
        borderRadius: 1,
        boxShadow: 3,
        p: 1
      }}
    >
      <ToggleButtonGroup
        value={selectedFilters}
        onChange={handleFilterChange}
        aria-label="location filters"
        size="small"
      >
        <ToggleButton value="MONUMENT" aria-label="monuments">
          <LocationOn />
          <Typography sx={{ ml: 1 }}>Monuments</Typography>
        </ToggleButton>
        <ToggleButton value="ARTISAN_MARKET" aria-label="artisan markets">
          <Store />
          <Typography sx={{ ml: 1 }}>Markets</Typography>
        </ToggleButton>
        <ToggleButton value="RESTAURANT" aria-label="restaurants">
          <Restaurant />
          <Typography sx={{ ml: 1 }}>Restaurants</Typography>
        </ToggleButton>
        <ToggleButton value="HOTEL" aria-label="hotels">
          <Hotel />
          <Typography sx={{ ml: 1 }}>Hotels</Typography>
        </ToggleButton>
        <ToggleButton value="LAKE" aria-label="lakes">
          <Park />
          <Typography sx={{ ml: 1 }}>Lakes</Typography>
        </ToggleButton>
        <ToggleButton value="VIEWPOINT" aria-label="viewpoints">
          <Landscape />
          <Typography sx={{ ml: 1 }}>Views</Typography>
        </ToggleButton>
        <ToggleButton value="MALL" aria-label="malls">
          <LocalMall />
          <Typography sx={{ ml: 1 }}>Malls</Typography>
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default Filters;