const transporter = require('./transport');
var sys = require('sys')
var axios = require('axios')
var exec = require('child_process').exec;
function puts(error, stdout, stderr) { console.log(stdout) }

const checkForContest = async () =>{
	await axios.get('https://contest-remainder-service.herokuapp.com');
	var d = new Date();
	var hour = d.getHours();
	var minute = d.getMinutes();
	var second = d.getSeconds();
	var send = true;
	console.log("H: ",hour," M: ",minute," S: ",second);
	if((hour == 8)&&(minute >= 19)&&(minute < 20)&&(second > 0)&&(second < 30)&&(send != true)){ //3600000
		await transporter();
		send = true;
		checkForContest();
	} else {
		console.log("NO Data");
		send = false;
		setTimeout(()=>{checkForContest()}, 900000);
		return;	
	}
}

module.exports = {
	checkForContest: checkForContest
}
