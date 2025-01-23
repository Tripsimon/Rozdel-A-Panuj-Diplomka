import React, { useEffect, useState } from 'react'
import AdventurerManagementChoice from '../components/AdventurerManagementChoice'

import axios from 'axios';

import { useSelector } from 'react-redux';
import { reduxIsLoggedIn } from '../store/userSlice';

function AdventurerManagement() {
  const isLoggedIn = useSelector(reduxIsLoggedIn);

      const [loadedAdventurersState, setLoadedAdventurersState] = useState([]);

  useEffect(() => {
    getAdventurers();
  });

  const getAdventurers = () => {



    axios.get(axios.defaults.baseURL + '/character/getCharacters', { params: { owner: isLoggedIn } })
      .then((response) => {
        console.log(response)
      })

  }


  return (
    <div>

       <AdventurerManagementChoice></AdventurerManagementChoice>
    </div>
  )
}

export default AdventurerManagement