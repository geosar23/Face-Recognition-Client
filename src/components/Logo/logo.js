import React from 'react'
import Tilty from 'react-tilty'
import brain from './brain.png'
import './logo.css'


const Logo=()=>{
    return(
        <div className='ma4 mt0 grow'>
            <Tilty reverse axis="x" scale={1.2} perspective={700} reset={false}>
                <div className="Tilt-inner pa3">
                    <img style={{paddingTop:'5px'}}alt='logo' src={brain}></img>
                </div>
            </Tilty>
        </div>
    )
}

export default Logo