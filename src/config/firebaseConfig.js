import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyBTYLWkj8xYDrlpcbMK9fYS0Le0PG8D1PA",
    authDomain: "mydb-d09a2.firebaseapp.com",
    projectId: "mydb-d09a2",
    databaseURL: "https://mydb-d09a2-default-rtdb.firebaseio.com/"
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
