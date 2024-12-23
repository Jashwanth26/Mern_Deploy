import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Myprofile from './components/Myprofile';
import Indprofile from './components/Indprofile';
import ForgotPassword from './components/ForgotPassword';
import ValidateOTP from './components/ValidateOTP';
import ResetPassword from './components/ResetPassword';
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/validate-otp" element={<ValidateOTP />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/myprofile' element={<Myprofile />} />
          <Route path="/indprofile/:fullname/:email/:skill/:_id" element={<Indprofile />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
