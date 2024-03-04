import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar'; // Assuming the correct path
import Home from './components/Home/Home';
import User from './components/User/User';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        {/* Place Navbar outside Routes for consistent visibility */}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/users/:userId" element={<User/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
