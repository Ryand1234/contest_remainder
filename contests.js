const axios = require('axios')
var { codechefData } = require('./extract')
var bcrypt = require('bcryptjs')

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
const checkForContest = async()=>{
	console.log('Hello')
	const codechef_data = await codechefData();
	message = '<html><body>'
	var error;
	if(error == undefined)
	{
		message += (
				'<p>Hello Riyan,</p>' +
				'<p>This is a list of upcoming and present Contest on Codechef and Codeforces.</p>' +
				'<p>CodeForces Upcomign and Present Contest List: </p>' +
				'<table style="border: 1px solid cyan; border-collapse: collapse; width: 100%;">' +
	            '<tr>' +
	                '<th align="center" style="border: 1px solid cyan; dth:16%; text-align: center;">' +
	                        'CODE' +
	                '</th>' +
	                '<th align="center" style="border: 1px solid cyan; text-align: center;">' +
	                        'NAME' +
	                '</th>' +
	                '<th align="center" style="width:16%; text-align: center;">' +
	                        'START' +
	                '</th>' +
	                '<th align="center" style="border: 1px solid cyan; width:16%; text-align: center;">' +
	                        'CONTEST DURATION' +
	                '</th>' +
	            '</tr>'
			)
		let codeforces_data = await axios('https://codeforces.com/api/contest.list')
		codeforces_data = codeforces_data.data.result;
		for(var i = 0; i < codeforces_data.length; i++)
		{
			if(codeforces_data[i].phase == 'FINISHED')
				break;
			var date = new Date(codeforces_data[i].startTimeSeconds*1000)
			var local_date = new Date(date)
			message += (
				'<tr>' +
				'<td style="border: 1px solid cyan; text-align: center;">' + codeforces_data[i].id+ '</td>' +
				'<td style="border: 1px solid cyan; text-align: center;">' + codeforces_data[i].name + '</td>' + 
				'<td style="border: 1px solid cyan; text-align: center;">' + local_date.toLocaleString() + '</td>' + 
				'<td style="border: 1px solid cyan; text-align: center;">' + time(codeforces_data[i].durationSeconds) + '</td> </tr>' 
				);
		}
		message += (
			'</table>' +
			'<br><p>CodeChef Upcoming and Current Contests: </p>' +
			'<table style="border: 1px solid cyan; border-collapse: collapse; width: 100%;">' +
            '<tr>' +
                '<th align="center" style="border: 1px solid cyan; dth:16%; text-align: center;">' +
                        'CODE' +
                '</th>' +
                '<th align="center" style="border: 1px solid cyan; text-align: center;">' +
                        'NAME' +
                '</th>' +
                '<th align="center" style="width:16%; text-align: center;">' +
                        'START' +
                '</th>' +
                '<th align="center" style="border: 1px solid cyan; width:16%; text-align: center;">' +
                        'END' +
                '</th>' +
            '</tr>'
			)


		for(var i = codechef_data.length-1; i >= 0; i--)
		{
			message += (
				'<tr>' +
				'<td style="border: 1px solid cyan; text-align: center;">' + codechef_data[i].code+ '</td>' +
				'<td style="border: 1px solid cyan; text-align: center;">' + codechef_data[i].name + '</td>' + 
				'<td style="border: 1px solid cyan; text-align: center;">' + codechef_data[i].start + '</td>' + 
				'<td style="border: 1px solid cyan; text-align: center;">' + codechef_data[i].end + '</td> </tr>' 
				);
		}
		message += '</table>'
	}
	message += '</body></html>'
	var nextDate = new Date()
	nextDate.setDate(nextDate.getDate() + 1)
	var mailOptions = {
		to: 'riyandhiman14@gmail.com',
		subject: `Upcoming Contests`,
		content: message,
		date: nextDate,
		token: bcrypt.hashSync('Remainder-Service')
	}
	return mailOptions
}

module.exports = checkForContest;