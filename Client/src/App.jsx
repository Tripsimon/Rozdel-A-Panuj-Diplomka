import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import axios from 'axios'


import HomePage from './pages/Home.jsx'
import RulesPage from './pages/Rules.jsx'
import ThanksPage from './pages/Thanks.jsx'

import Navbar from './components/Navbar.jsx'
import LoginModal from './components/LoginModal.jsx'
import RegisterModal from './components/RegisterModal.jsx'


function App() {

  //Axios nastaveni
//Mód developování
  const devMode = true
  if(devMode){
    axios.defaults.baseURL ='http://localhost:3000'
  }else{
    axios.defaults.baseURL = 'https://api.rozdel-a-panuj.cz'
  }

  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>

      <LoginModal></LoginModal>
      <RegisterModal></RegisterModal>

      <Navbar></Navbar>
        <Routes>
          <Route index path='/' element={<HomePage></HomePage>} />
          <Route index path='/rules' element={<RulesPage></RulesPage>} />
          <Route index path='/thanks' element={<ThanksPage></ThanksPage>} />

          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
