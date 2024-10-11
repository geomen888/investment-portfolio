import { configureStore } from '@reduxjs/toolkit';

import companySlice from './company-slice';
import investmetsSlice from './investment-slice';

const store = configureStore({
  reducer: { investments: investmetsSlice, companies: companySlice },
});

export type RootState = ReturnType<typeof store.getState>;
export type CompaniesState = { companies: ReturnType<typeof companySlice> };
export type InvestmentsState = { investments: ReturnType<typeof investmetsSlice> };

export type AppDispatch = typeof store.dispatch;

export default store;
