import React from 'react'
import AdventurerManagementChoice from '../components/AdventurerManagementChoice'

function AdventurerManagement() {
  return (
    <div>
      <a onClick={() => document.getElementById('createAdventurerModal').showModal()} className="m-2 uppercase btn btn-outline text-primary hover:bg-primary hover:text-primary hover:border-backdrop">Vytvořit nového</a>
      <AdventurerManagementChoice></AdventurerManagementChoice>
    </div>
  )
}

export default AdventurerManagement