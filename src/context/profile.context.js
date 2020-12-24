/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
import React,{createContext, useState, useContext, useEffect} from 'react'
import { auth, database } from '../misc/firebase'





const ProfileContext = createContext();

export const ProfileProvider = ({ children }) =>{

    const [profile,setProfile] = useState(null);
    const [isLoading,setIsLoading] = useState(true);

    useEffect(()=>{

        let userRef;

      const authUnsubscribe = auth.onAuthStateChanged(authObj=>{

            if(authObj){
// check for datbase for signedin user or not signedin user

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
             }else{
                // this when signedoff
                if(userRef){
                    userRef.off();
                 }
                setProfile(null);
                setIsLoading(false);
            }
        });

        return () =>{
        authUnsubscribe();
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