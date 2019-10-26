import * as firebase from "firebase";

  // Initialize Firebase
  var config = {
      apiKey: "AIzaSyBMNjWQ2WDynf58aa8Opmgd8_T5hV5cGFU",
      authDomain: "my-first-activity.firebaseapp.com",
      databaseURL: "https://my-first-activity.firebaseio.com",
      projectId: "my-first-activity",
      storageBucket: "my-first-activity.appspot.com",
      messagingSenderId: "494408684295"
  };
  firebase.initializeApp(config);

    const database = firebase.database();

export {database};