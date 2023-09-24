import React from 'react';
import './ImageInputForm.css';

const ImageInputForm = ({loading, onURLchange, onFileChange, onLinkSubmtion, onFileUpload }) => {

    return (
        <div className='form-group'>
            <div className='form-group'>
                <p>
                    {'This Magic Brain A will detect faces in your pictures via URL link for '}
                    <span className='text-warning font-weight-bold' style={{ fontSize: '40px' }}>{'1'}</span>
                    {' point per face recognized'}
                </p>
                <input className='form-control w-50 center' type='text' style={{ WebkitBorderRadius: '5px' }} onChange={onURLchange} />
                <button
                    onClick={onLinkSubmtion}
                    className={`m-2 grow f4 link ph3 pv2 dib white bg-light-purple button-150 ${loading ? 'disabled' : ''}`}
                    style={{ WebkitBorderRadius: '5px' }}
                >
                    {loading ? (
                        <span className="mt-2 mb-3 spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    ) : (
                        'Detect via url link'
                    )}
                </button>

                <div className="mt-5">
                    <p>
                        {'This Magic Brain B will detect faces in your pictures via file uploading for '}
                        <span className='text-danger font-weight-bold' style={{ fontSize: '40px' }}>2</span>
                        {' points per face recognized'}
                    </p>
                    <input className="center form-control w-50" type="file" id="formFile" onChange={onFileChange}/>
                </div>
                <button
                    onClick={onFileUpload}
                    className={`m-2 grow f4 link ph3 pv2 dib white bg-light-purple button-150 ${loading ? 'disabled' : ''}`}
                    style={{ WebkitBorderRadius: '5px' }}
                >
                    {loading ? (
                        <span className="mt-2 mb-3 spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    ) : (
                        'Detect via file'
                    )}
                </button>
            </div>
        </div>
    );
};

export default ImageInputForm;
