const cheerio = require('cheerio');
const axios = require('axios')

url = 'https://www.codechef.com/contests'

const codechefData = async () => {

	const res = await axios.get(url)
	const $ = cheerio.load(res.data);
	const data = []
	var rowData = {}
	$('.dataTable tr td').each(function(i){

		if(i < 40)
		{
			switch(i%4)
			{
				case 0: rowData["code"] = $(this).text().trim()
						break;
				case 1: rowData["name"] = $(this).text().trim()
						break;
				case 2: rowData["start"] = $(this).text().trim()
						break;
				case 3: rowData["end"] = $(this).text().trim()
						data.push(rowData)
						rowData = {}
						break;
				
			}
		}
	})
	return data;
};

module.exports = {
	codechefData: codechefData
}