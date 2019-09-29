var express = require('express')
var app = express()
var bodyParser = require('body-parser')
const axios = require('axios')

// for parsing application/json
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

//API route to be called
app.post('/', function(req, res) {
  const message = req.body.message

  if (!message || message.text.toLowerCase().indexOf('<desired user input>') < 0) {
    // In case a message is not present, or if our message does not have the word hi in it, do nothing and return an empty response
    return res.end()
  }

  // Remember to use your own API toked instead of the one below  "https://api.telegram.org/bot<your_api_token>/sendMessage"
  axios
    .post(
      'https://api.telegram.org/bot<your api key, removed for privacy>/sendMessage',
      {
        chat_id: message.chat.id,
        text: '<desired bot output>'
      }
    )
    .then(response => {
      // if message successfully posted
      console.log('Message posted')
      res.end('ok')
    })
    .catch(err => {
      //if message not successfully posted
      console.log('Error :', err)
      res.end('Error :' + err)
    })
})

//start server
app.listen(3000, function() {
  console.log('Telegram app listening on port 3000!')
})
