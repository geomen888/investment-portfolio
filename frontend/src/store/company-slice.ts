import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Company {
  id: string;
  name: string;
  location: string;
  fundingRound: string;
  employees: number;
  investment: string;
}

interface CompaniesState {
  items: Company[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CompaniesState = {
  items: [],
  status: 'idle',
  error: null,
};

const fetchData = async () => {
  const response = await fetch(
    'http://localhost:3000/companies'
  );

  if (!response.ok) {
    throw new Error('Could not fetch comapny data!');
  }

  const data = await response.json();
  console.log('fetch', data);

  return data;
};

// Async thunk for fetching companies
export const fetchCompanies = createAsyncThunk('companies/fetchCompanies', async () => {
  const companyData = await fetchData();
  return companyData;
});

const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchCompanies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch companies';
      });
  },
});

export default companiesSlice.reducer;
