import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import JobBoard from './pages/JobBoard';
import JobDetailed from './pages/JobDetailed';

function App() {
  let navigate = useNavigate();

  useEffect(() => {
    navigate('/1');
  }, []);

  return (
    <div>
      <Routes>
         <Route path='/:page' element={ <JobBoard /> } />
         <Route path='/:page/detailed/:id' element={ <JobDetailed /> } />
      </Routes>
    </div>
  );
}

export default App;
