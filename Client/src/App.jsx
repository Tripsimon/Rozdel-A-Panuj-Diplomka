import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Navbar from './components/Navbar.jsx'

import HomePage from './pages/Home.jsx'
import RulesPage from './pages/Rules.jsx'
import ThanksPage from './pages/Thanks.jsx'
import RegisterPage from './pages/Register.jsx'
import LoginPage from './pages/Login.jsx'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Navbar></Navbar>

        <Routes>
          <Route index path='/' element={<HomePage></HomePage>} />
          <Route index path='/rules' element={<RulesPage></RulesPage>} />
          <Route index path='/thanks' element={<ThanksPage></ThanksPage>} />

          <Route index path='/register' element={<RegisterPage></RegisterPage>} />
          <Route index path='/login' element={<LoginPage></LoginPage>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
