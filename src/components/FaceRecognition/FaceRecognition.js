import React from 'react'
import  './FaceRecognition.css'

const FaceRecognition = ({imageUrl, boxes})=>{

    return(
        <div className='center ma'>
            <div className='absolute mt2'>
               
            {imageUrl ? 
                (
                    <img
                        className='image border border-1 rounded'
                        id='inputImage'
                        alt=''
                        src={imageUrl}
                        width='500px'
                        height='auto'
                    />
                ) : null
            }

                
                {
                    boxes?.length > 0 ? boxes.map((box, index) => {
                        return (
                            <div key={index} className="bounding-box" style={{top: box.topRow, right:box.rightCol, bottom:box.bottomRow, left:box.leftCol}}></div>
                        );
                    }) :
                    <div></div>
                }
                
               
            </div>
        </div>
    )
}

export default FaceRecognition