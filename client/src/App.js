import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import produce from 'immer';
import * as firebase from 'firebase';
import axios from './axios';
import {database} from "./firebase";

import Navbar from './components/Navbar/Navbar';
import Button from './components/Button/Button';
import Modal from './components/Modal/Modal';
import Input from './components/Input/Input';

class App extends Component {

    state = {
        data: [
            // {'fileName': 'file1', 'comment': 'comment1', 'id': 1},
            // {'fileName': 'file2', 'comment': 'comment2', 'id': 2},
            // {'fileName': 'file3', 'comment': 'comment3', 'id': 3},
        ],
        newFileName: '',
        newComment: '',
        currentId: '',
        // fileUploadName: '',
        showModal: false,
        canSaveButton: false,
        file_upload_name1: 'Click here',
        file_upload_name2: 'Click here',
    }

    componentDidMount(){
        console.log('component did mount');

        // get data
        axios.get('/.json')
        .then(res=>{
            console.log('load: ',res.data);

            this.setState({
                data: res.data.data,
                dbLoaded: true,
            });
        })
        .catch(err=>console.log(err));
    }

    updateDatabase = (data) =>{
        console.log('updatemethod: ', this.state.data);
        console.log('pass data:', data);

        database.ref("-LYQMvCCcIhXxVdiPSvW").set({
            "data": data,
        });
    }

    uploadFileHandler = (ev) =>{
        const newData = {
            'fileName': this.state.file_upload_name1,
            'comment': '',
            'id': Math.floor(Math.random() * 100000000000000000) + 1,
        }

        // update immutably
        const updatedData = produce(this.state.data, draft =>{
            draft.push(newData);
        });
        
        this.setState({
            data: updatedData,
            showModal: false,
            file_upload_name1: 'Click here',
            file_upload_name2: 'Click here',
        });

        // update db
        this.updateDatabase(updatedData);

    }

    handleKeyPress = (ev) =>{
        if(ev.key === 'Enter'){
            this.uploadFileHandler();
        }
    }

    closeModalHandler = () =>{
        this.setState({ showModal: false});
    }

    sohwModalHandler = () =>{
        this.setState({ showModal: true });
    }

    inputHandler = (ev) =>{
        console.log('ev', ev.target.name);

        if(ev.target.name === 'file_name'){
            this.setState({
                'newFileName': ev.target.value
            });
        }
        else if(ev.target.name === 'comment'){
            this.setState({
                'newComment': ev.target.value
            });
        }
        // else if(ev.target.name === 'file_upload_name'){
        //     this.setState({
        //         'fileUploadName' : ev.target.value
        //     });
        // }
        else if(ev.target.type && ev.target.type === 'file'){
            // display file name when file was selected
            const label = ev.target.nextElementSibling;
            const labelVal = label.innerHTML;

            let fileName = '';
            if(ev.target.files && ev.target.files.length > 1){
                fileName = (ev.target.getAttribute('data-multiple.caption') || '').replace('{count}', ev.target.files.length);
            }
            else{
                fileName = ev.target.value.split('\\').pop();
            }

            if(fileName){
                const span = ev.target.name +1;
                console.log('span state: ', span);
                this.setState({ [span]: fileName });
            }
            else{
                const label = ev.target.name +2;
                this.setState({[label]:labelVal});
            }
        }

    }

    inputBlurHandler = (ev) =>{
        console.log('blur', ev.target);

        // get current id
        const id = this.state.currentId;
        console.log('id', id);

        // find index
        const dataIndex = this.state.data.findIndex(val =>{
            return val.id === id;
        });
        console.log('index', dataIndex);

        // update state immutably
        if(ev.target.name === 'file_name'){            
            const updatedData = produce(this.state.data, draft =>{
                draft[dataIndex].fileName = this.state.newFileName;;
            });

            this.setState({data: updatedData});
            // update db
            this.updateDatabase(updatedData);
            
        }
        else if(ev.target.name === 'comment'){
            const updatedData = produce(this.state.data, draft =>{

                draft[dataIndex].comment = this.state.newComment;
            });

            this.setState({data: updatedData});
            // update db
            this.updateDatabase(updatedData);

        }

    }

    fileNameClickedHandler = (id) =>{
        console.log('id', id);

        // find index of data
        const dataIndex = this.state.data.findIndex(val=>{
            return val.id === id;
        });

        this.setState({
            'newFileName': this.state.data[dataIndex].fileName,
            'newComment': this.state.data[dataIndex].comment,
            'currentId': id
        });
    }

    render(){
        console.log('=======================', this.state);

        let files = null;
        let commentHtml = null;

        // check if db finish loading
        if(this.state.dbLoaded){
            // render files
            if(this.state.data.length){
                files = this.state.data.map((val)=>{
                    return <div onClick={this.fileNameClickedHandler.bind(this, val.id)} className='file-list-item' key={val.id} dataid={val.id}>{val.fileName}</div>;
                });
            }
            else{
                files =  <p>There are no files to display</p>;
            }

            // render comment area
            if (this.state.currentId){
                commentHtml =  <div>
                    <Input
                        inputtype='input'
                        type='text'
                        label='File Name'
                        value={this.state.newFileName}
                        name='file_name'
                        id='file_name'
                        onChange={this.inputHandler}
                        onBlur={this.inputBlurHandler}/>

                    <Input
                        inputtype='textarea'
                        name='comment'
                        id='comment'
                        rows='5'
                        value={this.state.newComment}
                        onChange={this.inputHandler}
                        onBlur={this.inputBlurHandler}
                        label='Comment'/>
                </div>;
                
            }
            else{
                commentHtml = <p>No Files Selected</p>
            }
        }
        
       
        return (
            <div className="App">
                <Navbar>
                    <div className="leftContainer">
                        <Button
                            color='primary'
                            onClick={this.sohwModalHandler}>Add</Button>
                    </div>
                </Navbar>

                <div style={{padding: 20+'px'}}></div>

                <section className="mainContainer">
                    <div className='disp-flex align-items-flex-start'>
                        <div className='flex-25 listFileContainer'>
                            {files}
                        </div>
                        <div className="flex-75 textInputContainer">
                            {commentHtml}
                        </div>
                    </div>
                </section>

                <Modal
                    title='Upload a File'
                    onSaveBtnClicked={this.uploadFileHandler}
                    onCloseBtnClicked={this.closeModalHandler}
                    showModal={this.state.showModal}>
                        <div className='modalContent'>
                            {/* <Input
                                inputtype='input'
                                type='text'
                                label='Name of File'
                                name='file_upload_name'
                                id='file_upload_name'
                                onChange={this.inputHandler}
                                onKeyPress={this.handleKeyPress}/> */}

                            <Input
                             inputtype='input'
                             type='file'
                             name='file_upload_name'
                             id='file_upload_name'
                             onChange={this.inputHandler}
                             filelabelspan={this.state.file_upload_name1}
                             filelabel={this.state.file_upload_name2}/>
                        </div>
                    </Modal>
              
                

            </div>
          );
    }

}

export default App;
