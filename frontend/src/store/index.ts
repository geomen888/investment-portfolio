import { configureStore } from '@reduxjs/toolkit';

import companySlice from './company-slice';
import investmetsSlice from './investment-slice';
import uiSlice from './ui-slice';

const store = configureStore({
  reducer: {
    investments: investmetsSlice,
    companies: companySlice,
    ui: uiSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type CompaniesState = { companies: ReturnType<typeof companySlice> };
export type InvestmentsState = { investments: ReturnType<typeof investmetsSlice> };
export type UIState = { ui: ReturnType<typeof uiSlice> };

export type AppDispatch = typeof store.dispatch;

export default store;
