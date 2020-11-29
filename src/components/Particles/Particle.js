import React from 'react'
import Particles from 'react-particles-js';
import './Particle.css'

const Particle = () =>{
    return(
        <Particles className='particle'
        params={{
              particles: {
                  line_linked: {
                      shadow: {
                          enable: true,
                          color: "#3CA9D1",
                          blur: 5
                      }
                  }
              }
          }}
      />
    )
}

export default Particle