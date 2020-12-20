import firebase from 'firebase'



const config = {
    apiKey: "AIzaSyArXuuKUMPZnAj-e8eLfbIKYmLhYH_nYQ0",
    authDomain: "chatapp-f2912.firebaseapp.com",
    databaseURL: "https://chatapp-f2912-default-rtdb.firebaseio.com",
    projectId: "chatapp-f2912",
    storageBucket: "chatapp-f2912.appspot.com",
    messagingSenderId: "49066657053",
    appId: "1:49066657053:web:86a0f2c1a4b3b4115d0df4"
  };

  export const app = firebase.initializeApp(config);