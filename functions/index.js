// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

const axios = require('axios')
const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp()
// Since this code will be running in the Cloud Functions enviornment
// we call initialize Firestore without any arguments because it
// detects authentication from the environment.
const firestore = admin.firestore()

exports.update = functions.https.onRequest((request, response) => {
  let url = 'https://api.coinmarketcap.com/v2/ticker/1027/?convert=JPY'
  axios.get(url)
  .then(function (res) {
    let JPY = res.data.quotes.JPY.price
    let USD = res.data.quotes.USD.price
    let data = { JPY, USD }
    firestore.collection('exchangeRates').doc('coinmarketcap').update(data)
    // console.log(response)
    response.send(200)
  })
  .catch(function (error) {
    // console.log(error)
  })
})
