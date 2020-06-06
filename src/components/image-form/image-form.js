import React from 'react';
import './image-form.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
    return (
        <div>
            <p className='f3'>
                { 'Enter an image URL below to see the magic' }
            </p>
            <div className='CenterContent'>
                <div className='ImageForm CenterContent'>
                    <input className='f4 pa1 w-75 center' type='text' onChange={ onInputChange } />
                    <button className='w-25 grow f4 link ph3 pv2 dib black bg-light-purple' onClick={onButtonSubmit} > Detect </button>                
                </div>                
            </div>
        </div>
    )
}

export default ImageLinkForm;