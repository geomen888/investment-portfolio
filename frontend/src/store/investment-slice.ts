import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Investments {
  id: string;
  name: string;
  location: string;
  fundingRound: string;
  employees: number;
  company: any;
}

interface investmentsState {
  items: Investments[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: investmentsState = {
  items: [],
  status: 'idle',
  error: null,
};

const fetchData = async () => {
  const response = await fetch(
    'http://localhost:3000/investments'
  );

  if (!response.ok) {
    throw new Error('Could not fetch investments data!');
  }

  const data = await response.json();

  return data;
};

export const fetchInvestments = createAsyncThunk('investments/fetchInvestments', async () => {
  const investmentsData = await fetchData();
  return investmentsData;
});

const investmentsSlice = createSlice({
  name: 'investments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvestments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchInvestments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchInvestments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch investments';
      });
  },
});

export default investmentsSlice.reducer;
