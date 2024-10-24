import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RequestStatus  } from '../common/enums';
import { Investment } from '../common/interfaces';
import { customStoreRequest } from './request-managment-service/apiService';

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


export const fetchInvestments = createAsyncThunk('investments/fetchInvestments', async () => {
  const investmentsData = await customStoreRequest<Investment>('investments');
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
