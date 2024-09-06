import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CrimeData{
  id: string;
  case_number: string;
  date: string;
  block: string;
  iucr: string;
  primary_type: string;
  description: string;
  location_description: string;
  arrest: boolean;
  domestic: boolean;
  beat: string;
  district: string;
  ward: string;
  community_area: string;
  fbi_code: string;
  x_coordinate: string;
  y_coordinate: string;
  year: string;
  updated_on: string;
  latitude: string;
  longitude: string;
  location: {
    latitude: string;
    longitude: string;
    human_address: string;
  };
}
interface State{
  items: CrimeData[];
  status: string;
  error: string;
}

const crimeDataSlice = createSlice({
  name: 'CrimeData',
  initialState: {
    items: [],
    status: 'idle',
    error: ''
  } as State,
  reducers: {
    fetchCrimeRequest: (state) => {
      state.status = 'loading';
      state.error = '';
    },
    fetchCrimeSuccess: (state, action: PayloadAction<CrimeData[]>) => {
      state.status = 'succeeded';
      state.items = action.payload;
      state.error = '';
    },
    fetchCrimeFailure: (state, action: PayloadAction<string>) => {
      state.status = 'failed';
      state.error = action.payload;
    }
  }
});

export const { fetchCrimeRequest, fetchCrimeSuccess, fetchCrimeFailure } = crimeDataSlice.actions;
export default crimeDataSlice.reducer;
