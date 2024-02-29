import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React from 'react'
import Login from './Login'
import Podaci from './Podaci'
import Register from './Register'
import Pocetne from './Pocetne'
import SinglePage from './SinglePage'
import PocetnaLayout from './PocetnaLayout'
import Korisnik from './Korisnik'



function App() {
  return (

    <BrowserRouter>
      <>
        <Routes>
          <Route path="/" element={<PocetnaLayout />} >
            <Route path="/register" element={<Register />} />

            <Route path="/login" element={<Login />} />
            <Route path="/pocetne" element={<Pocetne />} />
            <Route path="/podaci" element={<Podaci />} />
            <Route path="/singlepage" element={<SinglePage />} />
            <Route path="/korisnik" element={<Korisnik />} />

          </Route>

        </Routes>
      </>
    </BrowserRouter>

  );
}

export default App;


