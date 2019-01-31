// Initialize Firebase
fetch("apiKeyFirebase.json")
  .then(res => res.json())
  .then(config => {
    firebase.initializeApp(config);
    const db = firebase.firestore();
    console.log(db);
  });
