import React from 'react';
import "./face-recognition.css";

const FaceRecognition = ({ imageUrl, box }) => {
    return (
        <div className='CenterContent ma'>     
            <div className='absolute mt2'>
                <img id='inputImage' alt='pic' src={imageUrl} />
                <div className='bounding' style={{ top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }}></div>        
            </div>       
             
        </div>
    )
}

export default FaceRecognition;