const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

exports.createScreams = functions.https.onRequest((request, response) => {
  const newScream = 
  {
    body: request.body.body,
    userHandle: request.body.userHandle,
    teste: request.body.teste,
    createdAt: admin.firestore.Timestamp.fromDate(new Date())
  };
  
  admin.firestore()
  .collection('screams')
  .add(newScream)
  .then(doc => {
    response.json({ message: `document ${doc.id} created successfully`})
    })
    .catch(err => {
      response.status(500).json({ message: 'someting went wrong'});
      console.error(err)
    })
  })
  
exports.getScreams = functions.https.onRequest((request, response) => {
  admin.firestore().collection('screams').get()
    .then(data => {
      let screams = [];
      data.forEach(doc => {
        screams.push(doc.data());
      })
      return response.json(screams);
    })
    .catch(err => console.error(err))
  })

exports.createAreas = functions.https.onRequest((request, response) => {
  const newScream =
  {
    type: request.body.type,
    geometryType: request.body.geometryType,
    propertiesName: request.body.propertiesName,
    coordinates: request.body.coordinates,
    createdAt: admin.firestore.Timestamp.fromDate(new Date())
  };

  admin.firestore()
    .collection('areas')
    .add(newScream)
    .then(doc => {
      response.json({ message: `document ${doc.id} created successfully` })
    })
    .catch(err => {
      response.status(500).json({ message: 'someting went wrong' });
      console.error(err)
    })
})

exports.getAreas = functions.https.onRequest((request, response) => {
  admin.firestore().collection('areas').get()
    .then(data => {
      let areas = [];
      data.forEach(doc => {
        areas.push(doc.data());
      })
      return response.json(areas);
    })
    .catch(err => console.error(err))
})

