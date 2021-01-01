/* eslint-disable no-console */
import firebase from 'firebase'

import 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'
import 'firebase/messaging'



const config = {
    apiKey: "AIzaSyArXuuKUMPZnAj-e8eLfbIKYmLhYH_nYQ0",
    authDomain: "chatapp-f2912.firebaseapp.com",
    databaseURL: "https://chatapp-f2912-default-rtdb.firebaseio.com",
    projectId: "chatapp-f2912",
    storageBucket: "chatapp-f2912.appspot.com",
    messagingSenderId: "49066657053",
    appId: "1:49066657053:web:86a0f2c1a4b3b4115d0df4"
  };

  const app = firebase.initializeApp(config);

  export const auth = app.auth();
  export const database = app.database();
  export const storage = app.storage();

  export const messaging = firebase
                            .messaging
                              .isSupported() ? app.messaging():null;
    if(messaging){
      messaging.usePublicVapidKey(
        'BEWr0rClcQWVC5lFEtWT4KJfK-NpQTneoezpnyMKKDzq3ruPnoJ_KvEzYkrS1XsyIoda3xkuZi5K9EpbdlBpMOA'
      );
      messaging.onMessage(data=>{
        console.log(data);
      })
    }
                              
