const transporter = require('./transport');
var sys = require('sys')
var exec = require('child_process').exec;
function puts(error, stdout, stderr) { console.log(stdout) }

const checkForContest = async () =>{
	exec("ping -c 3 localhost", puts);
	var d = new Date();
	var hour = d.getHours();
	var minute = d.getMinutes();
	var second = d.getSeconds();
	console.log("H: ", hour," M: ", minute," S: ", second)
	if((hour == 14)&&(minute > 50)){ //3600000
		await transporter('data');
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
