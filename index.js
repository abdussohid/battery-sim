const admin = require("firebase-admin");
const chokidar = require("chokidar");
const fs = require("fs");

// Service account key downloaded from Firebase
const serviceAccount = require("./battery-sim-firebase-keys.json");


// Initialize Firebase Admin
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});


// Firestore connection
const db = admin.firestore();


// Simulink output file
const FILE_PATH = "./test-data.json";


console.log("Watching file:");
console.log(FILE_PATH);


// Upload function
async function uploadBatteryData() {

    try {

        const rawData = fs.readFileSync(FILE_PATH, "utf8");

        const battery = JSON.parse(rawData);


        // Add upload timestamp
        battery.updatedAt =
            admin.firestore.FieldValue.serverTimestamp();


        // Save document using BatteryID
        await db
            .collection("batteries")
            .doc(battery.BatteryID)
            .set(battery);


        console.log(
            "Uploaded:",
            battery.BatteryID,
            new Date().toLocaleTimeString()
        );

    }
    catch (error) {

        console.error("Upload failed:");
        console.error(error);

    }
}


// Watch for file changes
chokidar
    .watch(FILE_PATH, {
        ignoreInitial: false
    })
    .on("change", uploadBatteryData)
    .on("add", uploadBatteryData);
