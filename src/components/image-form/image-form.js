import React from 'react';
import './image-form.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
    return (
        <div>
            <p className='f3'>
                { 'Click the button to see the magic' }
            </p>
            <div className='CenterContent'>
                <div className='ImageForm CenterContent'>
                    <input className='f4 pa2 w-70 center' type='text' onChange={ onInputChange } />
                    <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick={onButtonSubmit} > Detect </button>                
                </div>                
            </div>
        </div>
    )
}

export default ImageLinkForm;