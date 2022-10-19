const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.registerNotify = functions.https.onRequest((request, response) => {
  let { webHook } = request.body;
});
