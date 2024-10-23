import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Navbar from './components/Navbar.jsx'

import HomePage from './pages/Home.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar></Navbar>
      <BrowserRouter>
        <Routes>
          <Route index path='/' element={<HomePage></HomePage>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
