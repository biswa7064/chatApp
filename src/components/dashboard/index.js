/* eslint-disable arrow-body-style */
import React from 'react'
import { Drawer, Button, Divider, Alert } from 'rsuite'
import { useProfile } from '../../context/profile.context'
import EditableInput from './EditableInput';
import { database } from '../../misc/firebase';
import ProviderBlock from './ProviderBlock';
import AvtarUploadBtn from './AvtarUploadBtn'
import { getUserUpdate } from '../../misc/helpers';




const Dashboard = ({onSignOut}) => {

    const { profile } = useProfile();


    // set nickname and also name changed in firebase database
    const onSave = async newData =>{        

        try{ 
            const updates = await getUserUpdate(
               profile.uid,
               'name',
               newData,
               database
           ); 

           await database.ref().update(updates);

            Alert.success(`Nickname has been changed.`,4000);
        }catch(err){
            Alert.error(err.message,4000);
        }
    };

    return (
        <>
        <Drawer.Header>
            <Drawer.Title>Dashboard</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>
            <h3>Hello, {profile.name}</h3>
            <ProviderBlock/>
            <Divider />
            <EditableInput
             name = "nickname"
             initialValue = {profile.name}
             onSave = {onSave}
            label = {<h6 className = "md-2">Nickname</h6>}
            />
        <AvtarUploadBtn />
        </Drawer.Body>
        <Drawer.Footer>
        <Button block color = "red" onClick = {onSignOut}>
            Sign out
        </Button>
        </Drawer.Footer>

        </>
    )
}

export default Dashboard

