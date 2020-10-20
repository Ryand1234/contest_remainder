const transporter = require('./transport');
var axios = require('axios')

const checkForContest = async () =>{
	await axios.get('https://contest-remainder-service.herokuapp.com');
	var d = new Date();
	var hour = d.getHours();
	var minute = d.getMinutes();
	var second = d.getSeconds();
	console.log("H: ",hour," M: ",minute," S: ",second);
	if((hour == 11)&&(minute >= 4)&&(minute < 5)){ //3600000
		await transporter();
		setTimeout(()=>{checkForContest()}, 900000);
		return;
	} else {
		console.log("NO Data");
		setTimeout(()=>{checkForContest()}, 900000);
		return;	
	}
}

module.exports = {
	checkForContest: checkForContest
}
