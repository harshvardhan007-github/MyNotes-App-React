import React, { useContext } from 'react'
import Notes from './Notes'
import AddNote from './AddNote'


const Home = () => {

  return (
    <div>
      
      <Notes showAlert={props.showAlert} />
    </div>

  )
}

export default Home
