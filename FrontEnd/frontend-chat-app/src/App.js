import './App.css';
import Dashboard from './modules/Dashboard';
import Form from './modules/Form';
import { Routes, Route, redirect } from 'react-router-dom';
import ProtechedRoute from './routes/ProtectedRoute.js';
import Welcome from './components/Welcome/index.js';

function App() {
  return (
    <div className='bg-[#d1e1fa] h-screen flex justify-center items-center'>
      <Routes>
          <Route path='/users/login' element={<Form />} />
          <Route path='/users/signup' element={<Form />} />
          <Route path='/welcome' element={<Welcome />} />
          <Route path='/' element={<ProtechedRoute element={ Dashboard } />} />
      </Routes>
    </div>
  );
}

export default App;
