import firebase from 'firebase'

const config = {
    // apiKey: "AIzaSyBTYLWkj8xYDrlpcbMK9fYS0Le0PG8D1PA",
    // authDomain: "mydb-d09a2.firebaseapp.com",
    // projectId: "mydb-d09a2",
    // databaseURL: "https://mydb-d09a2-default-rtdb.firebaseio.com/"

    apiKey: "AIzaSyAq8w3oMJB6b8uOu0up_D0beBhJ-SuF6k8",
    authDomain: "fir-auth-7475a.firebaseapp.com",
    databaseURL: "https://fir-auth-7475a-default-rtdb.firebaseio.com",
    projectId: "fir-auth-7475a",
    storageBucket: "fir-auth-7475a.appspot.com",
    messagingSenderId: "359773419694",
    appId: "1:359773419694:web:a4a9dcd135c77bc426553f"
}

/*
const config = {
  apiKey: "AIzaSyAvE8yZMbjt6Y799fAHFOOJ-WhjdwGfK6A",
  authDomain: "vuejs-shopping-cart.firebaseapp.com",
  databaseURL: "https://vuejs-shopping-cart.firebaseio.com/"
}
*/
    
firebase.initializeApp(config);

export function firebaseListener(func) {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // console.log("User log in success", user);
      func(true, user)
    } else {
      // console.log("User log in failed", user);
      func(false)
    }
  }, function(error) {
    console.log(error)
  });
}

export const ref = firebase.database().ref();
export const firebaseAuth = firebase.auth;
