import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { RequestStatus  } from '../common/enums';
import { Company } from '../common/interfaces';
import { customStoreRequest } from './request-managment-service/apiService';

interface CompaniesState {
  items: Company[];
  status: RequestStatus;
  updateApiTrigger: boolean;
  error: string | null;
}

const initialState: CompaniesState = {
  items: [],
  status: RequestStatus.IDLE,
  error: null,
  updateApiTrigger: false,
};


export const fetchCompanies = createAsyncThunk('companies/fetchCompanies', async () => {
  const companyData = await customStoreRequest<Company>('companies');
  return companyData;
});

const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    triggerUpdateStatus(state) { 
      state.updateApiTrigger = !state.updateApiTrigger
     }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanies.pending, (state) => {
        state.status = RequestStatus.LOADING;
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.status = RequestStatus.SUCCEEDED;
        state.items = action.payload || [];
      })
      .addCase(fetchCompanies.rejected, (state, action) => {
        state.status =  RequestStatus.FAILED;
        state.error = action.error.message || 'Failed to fetch companies';
      });
  },
});

export const companiesActions = companiesSlice.actions;

export default companiesSlice.reducer;
