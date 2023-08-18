import React from 'react'
import '../App.css'
import { useNavigate } from 'react-router-dom'
export default function Main() {
  const navigate = useNavigate();
  const handleStartedClick = () =>{
    navigate('/home')
  }
  return (
    <div className='main-div'>
        <div className="container" id='main-div-inner'>
          <div className='text-center'>
          <h2>Welcome User</h2>
          <p>Embark on a Voyage of Infinite Creativity: Where Notes Transcend Pages, Ideas Sculpt Destiny, and Your Imagination Unleashes a Tapestry of Unbounded Possibilities, All Within the Grasp of Your Fingertips.</p>
          </div>
          <div className="getting-started" onClick={handleStartedClick}>Fetch Notes</div>
        </div>
    </div>
  )
}
