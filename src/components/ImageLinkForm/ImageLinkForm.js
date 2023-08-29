import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({loading, onChange, onSubmitButton }) => {

    return (
        <div className='ma4 mt0'>
            <p className='f3'>
                {'This Magic Brain will detect faces in your pictures. Give it a try'}
            </p>
            <div className=''>
                <input className='f4 pa2 w-70 center' type='text' style={{ WebkitBorderRadius: '5px' }} onChange={onChange} />
                <button
                    onClick={onSubmitButton}
                    className={`grow f4 link ph3 pv2 dib white bg-light-purple button-150 ${loading ? 'disabled' : ''}`}
                    style={{ WebkitBorderRadius: '5px' }}
                >
                    {loading ? (
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    ) : (
                        'Detect'
                    )}
                </button>
            </div>
        </div>
    );
};

export default ImageLinkForm;
