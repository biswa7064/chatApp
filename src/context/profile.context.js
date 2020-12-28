/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
import React,{createContext, useState, useContext, useEffect} from 'react'
import firebase from 'firebase/app'
import { auth, database } from '../misc/firebase';




export const isOfflineForDatabase = {
    state: 'offline',
    last_changed: firebase.database.ServerValue.TIMESTAMP,
};

const isOnlineForDatabase = {
    state: 'online',
    last_changed: firebase.database.ServerValue.TIMESTAMP,
};





const ProfileContext = createContext();

export const ProfileProvider = ({ children }) =>{

    const [profile,setProfile] = useState(null);
    const [isLoading,setIsLoading] = useState(true);

    

    useEffect(()=>{

        let userRef;
        let userStatusRef;

      const authUnsubscribe = auth.onAuthStateChanged(authObj=>{

            if(authObj){
// check for datbase for signedin user or not signedin user
                userStatusRef = database.ref(`/status/${authObj.uid}`);
               userRef = database.ref(`/profiles/${authObj.uid}`);

// whenever the above database data change then the bellow callbacke fired according to the data change in the database
                        userRef.on("value",snap=>{
                            const {name,createdAt,avatar} = snap.val();                           

                            const data = {
                                name,
                                avatar,
                                createdAt,
                                uid:authObj.uid,
                                email: authObj.email,
                            };
            
                            setProfile(data);
                            setIsLoading(false);
                            
                        });
                        
                        
                        


                        database.ref('.info/connected').on('value', (snapshot)=> {
                            // If we're not currently connected, don't do anything.
                            if (!!snapshot.val() === false) {
                                return;
                            };
                        
                            
                            userStatusRef
                            .onDisconnect()
                            .set(isOfflineForDatabase)
                            .then(()=> {                               
                                userStatusRef.set(isOnlineForDatabase);
                            });
                        });



             }else{
                // this when signedoff
                if(userRef){
                    userRef.off();
                 }


                 if(userStatusRef){
                     userStatusRef.off();
                 }

                 database.ref('.info/connected').off();

                setProfile(null);
                setIsLoading(false);
            }
        });

        return () =>{
        authUnsubscribe();
        database.ref('.info/connected').off();
        if(userRef){
            userRef.off();
        }
        
        }

    },[])

    return (
    <ProfileContext.Provider value = {{isLoading,profile}}>
        {children}
    </ProfileContext.Provider>
    );
};

export const useProfile = ()=> useContext(ProfileContext);