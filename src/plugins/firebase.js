import firebase from "firebase/app";
import "firebase/firestore";
if (!firebase.apps.length) {
  const firebaseConfig = {
    apiKey: "AIzaSyAGn-8_E_TZ9s2bCQsYyKy_LWzeyTmjc6Q",
    authDomain: "event-reception.firebaseapp.com",
    projectId: "event-reception",
    storageBucket: "event-reception.appspot.com",
    messagingSenderId: "1053308750059",
    appId: "1:1053308750059:web:1c81a29d52ef1c1d7196ae",
  };
  firebase.initializeApp(firebaseConfig);
}
const fireDb = firebase.firestore();
export { fireDb };
