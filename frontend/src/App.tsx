import { useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Dashboard from './components/Dashboard';
import GlobalStyles from './components/GlobalStyles'

import { AppDispatch, CompaniesState } from './store';
import { RequestStatus  } from './common/enums';

import { fetchCompanies, companiesActions } from './store/company-slice';

function App() {
  const dispatch: AppDispatch = useDispatch();

  const { status, updateApiTrigger } = useSelector((state: CompaniesState) => state.companies);

  useLayoutEffect(() => {
    
    if (status === RequestStatus.IDLE) {
      dispatch(fetchCompanies());
    }
    if (updateApiTrigger) {
      dispatch(fetchCompanies());
      dispatch(companiesActions.triggerUpdateStatus());
    } 

  }, [status, updateApiTrigger, dispatch]);

  return (

    <div className="App">
      <GlobalStyles />
      <Dashboard />
    </div>
  );
}

export default App;
