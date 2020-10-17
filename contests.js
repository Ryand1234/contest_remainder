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
	if((hour == 1)&&(minute >= 20)&&(minute < 21)&&(second > 0)&&(second < 10)){ //3600000
		await transporter();
		checkForContest();	
	} else {
		console.log("NO Data");
		setTimeout(()=>{checkForContest()}, 6000);
		return;	
	}
}

module.exports = {
	checkForContest: checkForContest
}
