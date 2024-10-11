import { useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Dashboard from './components/Dashboard';
import { AppDispatch, CompaniesState } from './store';
import { RequestStatus  } from './common/enums';

import { fetchCompanies } from './store/company-slice';

function App() {
  const dispatch: AppDispatch = useDispatch();

  const companies = useSelector((state: CompaniesState) => state.companies);

  useLayoutEffect(() => {
    if (companies.status === RequestStatus.IDLE) {
      dispatch(fetchCompanies());
    }
  }, [companies, dispatch]);

  return (
    <div className="App">
      <Dashboard />
    </div>
  );
}

export default App;
