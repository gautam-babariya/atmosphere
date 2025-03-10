import React from 'react'
import './Catcard.css'
import { Link } from 'react-router-dom'
import indor from './storage/indoor plant.svg'
import outdor from './storage/Outdor Plant.svg'
import cactus from './storage/Cactus.svg'
import bonsai from './storage/Bonsai.svg'
import { useNavigate } from 'react-router-dom';


function Catcard({ name }) {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate(`/productsell/${name}`);
  };
  return (
    <div id='catcard-container' onClick={handleRedirect} >
      <div id='catcard-img'>
        {name == 'indor' && <img src={indor} alt='indoor plant' />}
        {name == 'outdor' && <img src={outdor} alt='outdoor plant' />}
        {name == 'cactus' && <img src={cactus} alt='Cactus' />}
        {name == 'bonsai' && <img src={bonsai} alt='Bonsai' />}
      </div>

      {name == 'indor' && <div id='catcard-body'> Indoor
        Plant</div>}
      {name == 'outdor' && <div id='catcard-body'> Outdor
        Plant</div>}
      {name == 'cactus' && <div id='catcard-body'> Cactus
        Plant</div>}
      {name == 'bonsai' && <div id='catcard-body'> Bonsai
        Plant</div>}
    </div>
  )
}

export default Catcard
