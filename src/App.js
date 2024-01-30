import React, { useState } from 'react'
import './App.css';
import { Route, Routes } from 'react-router-dom';
import UserForm from './Auth/UserForm';
import Register from './Auth/Register';
import Login from './Auth/Login';
import Header from './Component/Header';
import Home from './Component/Home';
import SandboxForm from './Component/SandboxForm';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <div>
      <Header/>
      <Routes>
      <Route path='/home' element={<Home />} />
      <Route path="/user" element={<UserForm />}>
        <Route path="/user/register" element={<Register />} />
        <Route path="/user/login" element={<Login />} />
      </Route>
      <Route path='/home'>
        {token?<Home token={token} user={user} onLogout={handleLogout}/>:<p>Please log in</p>}
      </Route>
      <Route path="/sandbox">
          {token ? <SandboxForm token={token} /> : <p>Please log in</p>}
        </Route>
    </Routes>
    </div>
  )
}

export default App
