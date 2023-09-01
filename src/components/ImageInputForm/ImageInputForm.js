import React from 'react';
import './ImageInputForm.css';

const ImageInputForm = ({loading, onURLchange, onFileChange, onLinkSubmtion, onFileUpload }) => {

    return (
        <div className='ma4 mt0'>
            <div className=''>
                <p className='f3'>
                    {'This Magic Brain A will detect faces in your pictures via url link for 1 point per face recognized'}
                </p>
                <input className='f4 pa2 w-50 center' type='text' style={{ WebkitBorderRadius: '5px' }} onChange={onURLchange} />
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
                    <p className='f3 center'>
                        {'This Magic Brain B will detect faces in your pictures via file uploading for 2 point per face recognized'}
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
