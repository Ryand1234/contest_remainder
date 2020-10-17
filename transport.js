const nodemailer = require('nodemailer')
const axios = require('axios')
require('dotenv').config();

function time (second) {
    var sec_num = parseInt(second, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds;
}
const tranporter = async(data)=>{
	const driver = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: process.env.EMAIL,
				pass: process.env.PASSWORD
			}
		})
	contests = data.output;
	error = data.error;
	message = ''
	if(error == undefined)
	{
		message += (
				'<p>Hello Riyan,</p>' +
				'<p>This is a list of upcoming and present Contest on Codechef and Codeforces.</p>' +
				'<p>Codechef</p>' +
				'<thead>' +
		            '<tr>' +
		                '<th align="center" style="width:16%;">' +
		                        'CODE' +
		                '</th>' +
		                '<th align="center">' +
		                        'NAME' +
		                '</th>' +
		                '<th align="center" style="width:16%;">' +
		                        'START' +
		                '</th>' +
		                '<th align="center" style="width:16%;">' +
		                        'END' +
		                '</th>' +
		            '</tr>' +
				'</thead>' +
				'<tbody>'
			)
		let codeforces_data = await axios('https://codeforces.com/api/contest.list')
		codeforces_data = codeforces_data.data.result;
		for(var i = 0; i < codeforces_data.length; i++)
		{
			if(codeforces_data[i].phase == 'FINISHED')
				break;
			message += (
				'<tr>' +
				'<td>' + codeforces_data[i].id+ '</td>' +
				'<td>' + codeforces_data[i].name + '</td' + 
				'<td>' + time(codeforces_data[i].startTimeSeconds) + '</td' + 
				'<td>' + time(codeforces_data[i].durationSeconds) + '</td> </tr>' 
				);
		}
		message += '</tbody>'
	}

	var mailOptions = {
		from: process.env.EMAIL,
		to: 'riyandhiman14@gmail.com',
		subject: `Upcoming Contests`,
		html: message
	}

	//console.log("M: ", mailOptions)

	driver.sendMail(mailOptions, (err, status)=>{
		if(err){
			console.log("Error: "+err)
		}
	})
}

module.exports = tranporter;