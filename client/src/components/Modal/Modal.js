import React from 'react';
import './Modal.css';

import Button from '../Button/Button';

const modal = (props) =>{
    
    if(!props.showModal){
        return null;
    }

    return (
        <div className="Modal">
            <div className="container">
                <span onClick={props.onCloseBtnClicked} className='close'>&times;</span>
                <div className="header">
                    {props.title}
                </div>

                <div className="body">
                    {props.children}
                </div>

                <div className="footer">
                    <Button
                        color='primary'
                        type='button'
                        onClick={props.onSaveBtnClicked}
                        disabled={props.canSaveButton}>Upload</Button>
                </div>
            </div>
        </div>
    )
}

export default modal;