import React from 'react'
import './Loader.css'

const Loader = ({ name }) => {
  return (
    <div id='main-leader-div' >
      <div className="stage">
        {[...Array(20)].map((_, i) => (
          <div className="layer" key={i}></div>
        ))}
      </div>
    </div>
  )
}

export default Loader
