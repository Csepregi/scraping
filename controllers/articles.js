const articlesRouter = require('express').Router()
const cheerio = require('cheerio')
const axios = require('axios')

articlesRouter.get('/', async (request, response) => {

	axios.get('https://blog.risingstack.com/').then((res) => {
		const articles = [];
		const $ = cheerio.load(res.data);
		$('.post-header').each((index, element) => {
			const title = $(element)
				.children()
				.first()
				.text()
			const link = $(element)
				.children()
				.children()
				.attr('href')
			articles[index] = { title, link }
			const data = await axios.get(`https://blog.risingstack.com${link}`)
			console.log(data)
		})


		console.log(articles)
		response.json(articles)
	})



});


module.exports = articlesRouter

