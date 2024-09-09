
const { initializeApp } = require("firebase/app");
const { getFirestore, collection, addDoc } = require("firebase/firestore");
const fs = require('fs');
const path = require('path');

const firebaseConfig = {
  apiKey: "AIzaSyA4ez85BuLTVuwtA3zaiGFjTDLVJYFoHE0",
  authDomain: "blood-donation-17001.firebaseapp.com",
  projectId: "blood-donation-17001",
  storageBucket: "blood-donation-17001.appspot.com",
  messagingSenderId: "1007141747130",
  appId: "1:1007141747130:web:bc2f184a786482bdb18583",
  measurementId: "G-6ZRECG7KQT"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const dataPath = path.resolve(__dirname, '../../db.json'); 

fs.readFile(dataPath, 'utf8', async (err, jsonString) => {
  if (err) {
    console.log("File read failed:", err);
    return;
  }
  try {
    const data = JSON.parse(jsonString);

    const donorsCollection = collection(db, 'donors');
    for (const donor of data.Donors) {
      await addDoc(donorsCollection, donor);
      console.log(`Added donor: ${JSON.stringify(donor)}`);
    }

    const recipientsCollection = collection(db, 'recipients');
    for (const recipient of data.Recipients) {
      await addDoc(recipientsCollection, recipient);
      console.log(`Added recipient: ${JSON.stringify(recipient)}`);
    }

    const volunteersCollection = collection(db, 'volunteers');
    for (const volunteer of data.Volunteers) {
      await addDoc(volunteersCollection, volunteer);
      console.log(`Added volunteer: ${JSON.stringify(volunteer)}`);
    }

    const bloodBanksCollection = collection(db, 'blood-banks');
    for (const bloodBank of data["Blood-Banks"]) {
      await addDoc(bloodBanksCollection, bloodBank);
      console.log(`Added blood bank: ${JSON.stringify(bloodBank)}`);
    }

    console.log("Data uploaded successfully!");
  } catch (error) {
    console.error("Error uploading data: ", error);
  }
});
