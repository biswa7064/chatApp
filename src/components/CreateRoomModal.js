/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
import React, { useState, useCallback, useRef } from 'react'
import { Button, Icon, Modal, Form, FormGroup, ControlLabel, FormControl, Schema, Alert } from 'rsuite'
import firebase from 'firebase/app'
import { useModalState } from '../misc/custom-hooks'
import { database, auth } from '../misc/firebase';





const {StringType} = Schema.Types;


// this schema is only used for form validation
const model = Schema.Model({
    name: StringType().isRequired('Chat name is required'),
    description:StringType().isRequired('Description is required.'),
})


const INITIAL_FORM = {
    name:'',
    description:'',
};




const CreateRoomModal = () => {


    const {isOpen,open,close} = useModalState()

    const [formValue,setFormValue] = useState(INITIAL_FORM)
    const [isLoading,setIsLoading] = useState(false);
    const formRef = useRef();


    const onFormChange = useCallback((value)=>{
        setFormValue(value);
    },[]);


    const onSubmit = async ()=>{

        if(!formRef.current.check()){
            return;
        }

        setIsLoading(true);

        const newRoomdata = {
            ...formValue,
            createdAt: firebase.database.ServerValue.TIMESTAMP,
            admins:{
                [auth.currentUser.uid]:true,
            }
        }

        try{
            
           await database.ref('rooms').push(newRoomdata);
            Alert.info(`${formValue.name} has been created.`,4000)
            setIsLoading(false);
            setFormValue(INITIAL_FORM);
            close();
           

        }catch(err){
            setIsLoading(false)
            Alert.error(err.message,4000);
        }

    }




    return (
        <div className = "mt-1">
         <Button block color = "green" onClick = {open}>
             <Icon icon = "creative"/> Create new chat room
        </Button> 

        <Modal show = {isOpen} onHide = {close}>
            <Modal.Header>
            <Modal.Title>New chat room</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form 
                fluid 
                onChange = {onFormChange}
                 formvalue = {formValue}
                 model = {model}
                 ref = {formRef}>
                    <FormGroup>
                     <ControlLabel>Room name</ControlLabel>
                     <FormControl name = "name" placeholder = "Enter chat room name"/>   
                    </FormGroup>

                    <FormGroup>
                     <ControlLabel>Description</ControlLabel>
                     <FormControl componentClass = "textarea" rows = {5} name = "description" placeholder = "Enter description here"/>   
                    </FormGroup>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button block appearance = "primary" onClick  = {onSubmit} disabled = {isLoading}>
                 Create new Chat room   
                </Button>
            </Modal.Footer>
        </Modal>


        </div>
    )
}

export default CreateRoomModal
