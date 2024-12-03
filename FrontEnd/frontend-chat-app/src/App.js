import './App.css';
import Dashboard from './modules/Dashboard';
import Form from './modules/Form';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute.js';
import Welcome from './components/Welcome';
import FirstPage from './components/FirstPage';
import Login from './components/Login';
import SignUp from './components/SignUp';

function App() {
  return (
    <div className='bg-[#d1e1fa] h-screen flex justify-center items-center'>
      <Routes>
          <Route path='/' element={<FirstPage />} />
          <Route path='/users/login' element={<Login />} />
          <Route path='/users/signup' element={<SignUp />} />
          <Route path='/welcome' element={<Welcome />} />
          <Route path='/dashboard' element={<ProtectedRoute element={ Dashboard } />} />
          {/* <Route path='/' element={<Dashboard />}/> */}
      </Routes>
    </div>
  );
}

export default App;
