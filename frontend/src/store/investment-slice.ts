import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { URL } from './../common/constants'; 
import { RequestStatus  } from '../common/enums';
import { Investment } from '../common/interfaces';


interface investmentsState {
  items: Investment[];
  status: RequestStatus;
  error: string | null;
}

const initialState: investmentsState = {
  items: [],
  status: RequestStatus.IDLE,
  error: null,
};

const fetchData = async () => {
  const response = await fetch(
    `${URL}/investments`
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
        state.status = RequestStatus.LOADING;
      })
      .addCase(fetchInvestments.fulfilled, (state, action) => {
        state.status = RequestStatus.SUCCEEDED;
        state.items = action.payload;
      })
      .addCase(fetchInvestments.rejected, (state, action) => {
        state.status = RequestStatus.FAILED;
        state.error = action.error.message || 'Failed to fetch investments';
      });
  },
});

export default investmentsSlice.reducer;
