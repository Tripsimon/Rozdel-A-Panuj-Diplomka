import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import axios from 'axios'

import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { reduxIsLoggedIn, logoutUser } from './store/userSlice.js';


import HomePage from './pages/Home.jsx'
import RulesPage from './pages/Rules.jsx'
import ThanksPage from './pages/Thanks.jsx'
import AdventurerManagementPage from './pages/AdventurerManagement.jsx'
import Game from './pages/Game.jsx'
import ProtectedRoutes from './utils/ProtectedRoutes.jsx'
import ProtectedAdminRoutes from './utils/ProtectedAdminRoutes.jsx';

import Navbar from './components/Navbar.jsx'
import LoginModal from './components/LoginModal.jsx'
import RegisterModal from './components/RegisterModal.jsx'
import AdventurerCreateModal from './components/AdventurerCreateModal.jsx'
import MonsterManagement from './pages/MonsterManagement.jsx';
import LocalityManagement from './pages/LocalityManagement.jsx';
import ItemsManagement from './pages/ItemsManagement.jsx';
import MapManagement from './pages/MapManagement.jsx';
import LocalityCreateModal from './components/LocalityCreateModal.jsx';
import MapCreateModal from './components/MapCreateModal.jsx';
import GameBrowser from './pages/GameBrowser.jsx';



function App() {

  //Axios nastaveni
  //Mód developování
  const devMode = true
  if (devMode) {
    axios.defaults.baseURL = 'http://localhost:3001'
  } else {
    axios.defaults.baseURL = 'https://api.rozdel-a-panuj.cz'
  }

  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>

        <LoginModal></LoginModal>
        <RegisterModal></RegisterModal>
        <AdventurerCreateModal></AdventurerCreateModal>
        <LocalityCreateModal></LocalityCreateModal>
        <MapCreateModal></MapCreateModal>

        <Navbar></Navbar>
        <Routes>
          <Route index path='/' element={<HomePage></HomePage>} />
          <Route index path='/rules' element={<RulesPage></RulesPage>} />
          <Route index path='/thanks' element={<ThanksPage></ThanksPage>} />


          <Route element={<ProtectedRoutes></ProtectedRoutes>}>
            <Route index path='/adventurers' element={<AdventurerManagementPage />} />
            <Route index path='/game' element={<Game></Game>} />
            <Route index path='/gameBrowse' element={<GameBrowser></GameBrowser>}></Route>
          </Route>

          <Route element={<ProtectedAdminRoutes></ProtectedAdminRoutes>} >
            <Route index path='/admin/monsters' element={<MonsterManagement></MonsterManagement>} />
            <Route index path='/admin/localities' element={<LocalityManagement></LocalityManagement>} />
            <Route index path='/admin/maps' element={<MapManagement></MapManagement>} />
            <Route index path='/admin/items' element={<ItemsManagement></ItemsManagement>} />
          </Route>


        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App