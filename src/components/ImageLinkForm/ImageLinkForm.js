import React from 'react'
import './ImageLinkForm.css'

const ImageLinkForm=({onChange,onSubmitButton})=>{
    return(
        <div className='ma4 mt0'>
            <p className='f3'>
                {'This Magic Brain will detect faces in your pictures . Give it a try'}
            </p>
            <div className='form grow pa4 br3 shadow-5'>
                <input className='f4 pa2 w-70 center' type='text' style={{WebkitBorderRadius:'5px'}} onChange={onChange}></input>
                <button  onClick={onSubmitButton} className='grow f4 link ph3 pv2 dib white bg-light-purple' style={{WebkitBorderRadius:'5px'}}>
                    Detect
                </button>
            </div>
        </div>
    )
}

export default ImageLinkForm