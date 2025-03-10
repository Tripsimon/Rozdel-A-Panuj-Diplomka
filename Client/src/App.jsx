import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import axios from 'axios'


import HomePage from './pages/Home.jsx'
import RulesPage from './pages/Rules.jsx'
import ThanksPage from './pages/Thanks.jsx'
import AdventurerManagementPage from './pages/AdventurerManagement.jsx'
import Game from './pages/Game.jsx'

import Navbar from './components/Navbar.jsx'
import LoginModal from './components/LoginModal.jsx'
import RegisterModal from './components/RegisterModal.jsx'
import AdventurerCreateModal from './components/AdventurerCreateModal.jsx'


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
      <AdventurerCreateModal></AdventurerCreateModal>

      <Navbar></Navbar>
        <Routes>
          <Route index path='/' element={<HomePage></HomePage>} />
          <Route index path='/rules' element={<RulesPage></RulesPage>} />
          <Route index path='/thanks' element={<ThanksPage></ThanksPage>} />
          <Route index path='/adventurers' element={<AdventurerManagementPage/>} />


          <Route   element={<ProtectedRoutes></ProtectedRoutes>}>
                        <Route index element={<LoginPage></LoginPage>}/>
                        <Route index path='/game' element={<Game></Game>} />
                    </Route>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
