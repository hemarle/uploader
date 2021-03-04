import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyAa_6tCcEa3FRd4Sv848Sh7_UnTSBYN-Uk",
  authDomain: "uploader-e4059.firebaseapp.com",
  projectId: "uploader-e4059",
  storageBucket: "uploader-e4059.appspot.com",
  messagingSenderId: "737901685592",
  appId: "1:737901685592:web:a0b337f9a382445f78532d",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

export default storage;
