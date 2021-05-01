var http = require('http');
var checkForContest = require('./contests');
var cron = require('node-cron');
const axios = require('axios');

console.log("Service Starts")
cron.schedule('00 15 19 * * * * *', async() => {
  var contestData = await checkForContest();
  console.log('-------------------------------------')
  console.log('---------Cron Job Running------------')
  console.log('-------------------------------------')
  let url = 'https://remainder-model.herokuapp.com/notify'
  var options = {
    method: 'POST',
    headers: {
        'Content-type': 'application/json',
        Accept: 'application/json'
      },
    data: JSON.stringify(contestData)
  }
  var data = await axios(url, options)
  if(data.data.status) {
    console.log('Notification Created')
  } else {
    console.log('Error in creating Notification')
  }
})

http.createServer(function (req, res) {
  res.write('Hello World!');
  res.end();
}).listen(process.env.PORT||3000)