import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import LandingNav from './components/Dashboard';
import Dashboard from './components/Dashboard';

import {Routes,Route} from 'react-router-dom'
import MainPage from './components/MainPage';
import MainDashboard from './components/MainDashboard';

function App() {
  return (
    <div className='w-full h-screen'>
    <Routes>
      <Route path='/' element={<Dashboard/>} />
      <Route path='/dashboard' element={<MainPage/>}/>
      {/* <Route path='/mainpage' element={<MainDashboard/>}/> */}
    </Routes>
    </div>
  );
}

export default App;
