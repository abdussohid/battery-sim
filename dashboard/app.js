import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
    getFirestore,
    doc,
    onSnapshot
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAocNypA5xfMT7cANkmZ9i90QRF4vssNHs",
  authDomain: "battery-passport-740e0.firebaseapp.com",
  projectId: "battery-passport-740e0",
  storageBucket: "battery-passport-740e0.firebasestorage.app",
  messagingSenderId: "238904893028",
  appId: "1:238904893028:web:a0a213e053783a285d8971"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);


// BAT001 document
const batteryRef =
    doc(db, "batteries", "BAT001");


// Live updates
onSnapshot(batteryRef, (snapshot) => {

    const data = snapshot.data();

    if (!data) return;


    document.getElementById("batteryID").innerText =
        data.BatteryID;

    document.getElementById("soc").innerText =
        data.SOC.toFixed(2) + " %";


    document.getElementById("current").innerText =
        data.Current.toFixed(2) + " A";


    document.getElementById("voltage").innerText =
        data.Voltage.toFixed(2) + " V";


    document.getElementById("updated").innerText =
        new Date().toLocaleTimeString();

});
