import * as firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCRhUqnrA0Gcvj4uI_YT-ZHGz_KKR0PdBo",
    authDomain: "company-recruitment-system.firebaseapp.com",
    projectId: "company-recruitment-system",
    storageBucket: "company-recruitment-system.appspot.com",
    messagingSenderId: "1057456724357",
    appId: "1:1057456724357:web:627236b8c2fa55ea0eccec"
  };

let app;
if(firebase.apps.length == 0){
    app = firebase.initializeApp(firebaseConfig)
}else{
    app = firebase.app()
}

const db = app.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
export {db,auth, storage};