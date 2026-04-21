import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage/HomePage';
import Login from './Pages/Login/Login';
import Dashboard from './Pages/Dashboard/Dashboard';
import AboutUs from './Pages/AboutUs/AboutUs';
import ContactUs from './Pages/ContactUs/ContactUs';

function App() {
  return (
   <BrowserRouter>
      <Routes>
        <Route index element={<Navigate to="/login"/>}/>
        <Route path='/login' element={<Login/>} />
        <Route path='/home' element={<HomePage/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/about' element={<AboutUs/>} />
        <Route path='/contact_us' element={<ContactUs/>} />
      </Routes>
   </BrowserRouter>
  );
}

export default App;
