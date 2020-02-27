const articlesRouter = require('express').Router()
const cheerio = require('cheerio')
// const axios = require('axios')
const request = require('request-promise')

articlesRouter.get('/', async (req, res) => {
	const baseUrl = 'https://blog.risingstack.com'
	const mainhtml = await request(baseUrl)
	const articles = [];
	const $ = cheerio.load(mainhtml);
	$('.post-header').each((index, element) => {
		const title = $(element)
			.children()
			.first()
			.text()
		const link = baseUrl + $(element)
			.children()
			.children()
			.attr('href')
		articles[index] = { title, link }
	})

	const data = await Promise.all(articles.map(async (article) => {
		try {
			const experthtml = await request(article.link);
			const $ = cheerio.load(experthtml)

			const titles = $('h2')
			const smallTitles = titles.map((i, title) => {
				return $(title).text()
			}).get()
			return {
				title: article.link,
				smallTitles
			}
		} catch (error) {

		}
	}))

	console.log(data)
	res.json(data)
});


module.exports = articlesRouter

