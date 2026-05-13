import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
    getFirestore,
    doc,
    onSnapshot
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";



const firebaseConfig = {



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
