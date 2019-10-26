import React from 'react';
import './Input.css';

const input = (props) =>{
    let labelElement = null;
    let inputElement = null;
    let styleLabel = 'styleLabel';
    let styleLabelForCheckbox = 'checkBoxContainer';

    if(props.req){
        styleLabel += ' req';
        styleLabelForCheckbox += ' req';
    }

    if(props.inputtype === 'input' && props.type === 'text'){
        labelElement =  <label className={styleLabel} htmlFor={props.id}>{props.label}</label>;
        inputElement = <input className='inputText' {...props}/>;
    }

    else if(props.inputtype === 'input' && props.type === 'password'){
        labelElement =  <label className={styleLabel} htmlFor={props.id}>{props.label}</label>;
        inputElement = <input className='inputText' {...props}/>;
    }
    else if(props.inputtype === 'textarea'){
        labelElement =  <label className={styleLabel} htmlFor={props.id}>{props.label}</label>;
        inputElement = <textarea className='inputText' {...props}/>;
    }
    else if(props.inputtype === 'input' && props.type === 'file'){
        // labelElement =  <label htmlFor={props.id}>{props.label}</label>;
        // inputElement = <input className='' {...props}/>
        let fileLabelSpan = props.filelabelspan;
        let fileLabel = props.filelabel;
        let spanText = props.label;
        if(props.filelabelspan){
            spanText = null;
            fileLabel = null;
        }
        else if(props.filelabel){
            spanText = null;
            fileLabelSpan = null;
        }
        inputElement = <div>
                        <input {...props} className="inputfile"
                               data-multiple-caption="{count} files selected"/>
                        <label htmlFor={props.id}><span>{fileLabelSpan}{fileLabel}{spanText}</span></label>
                    </div>
    }
    else if(props.inputtype === 'select'){
        labelElement =  <label className={styleLabel} htmlFor={props.id}>{props.label}</label>;
        inputElement = <select className='inputSelect' {...props}>
            {props.options.map(option=>{
                return <option key={option.value} value={option.value}>{option.displayValue}</option>;
            })}
        </select>
    }
    else if(props.inputtype === 'input' && props.type === 'radio'){
        // inputElement = props.options.map(option=>{
        //     return <label key={option.value} htmlFor={option.id}>
        //             <input className='' {...props} value={option.value} id={option.id} name={props.name} checked={option.value === props.selected}/>{option.label}
        //         </label>;
        // })
        inputElement = <div className='disp-flex'>
                        {props.options.map(option=>{
                            return <React.Fragment key={option.id}>
                                <input {...props} type={props.type} className="buttonLikeRadio buttonLikeRadio-insurance_y_n" id={option.id} name={props.name} value={option.value} checked={option.value === props.selected}/>
                                <label className="round-border width100" htmlFor={option.id}>{option.label}</label>
                            </React.Fragment>
                        })}
                    </div>
    }
    else if(props.inputtype === 'input' && props.type === 'checkbox'){
        // inputElement = <label>
        //                 <input className='' {...props}/>{props.label}
        //             </label>;
        inputElement = <div>
                        <label className={styleLabelForCheckbox} htmlFor={props.name}>{props.label}
                        <input {...props} checked={!!props.ischecked}/>
                                <span className="checkmark"></span>
                        </label>
                    </div>
    }


    return (
        <div className='Input'>
            {labelElement}
            {inputElement}
        </div>
    )
}

export default input;