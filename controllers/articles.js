const articlesRouter = require('express').Router()
const cheerio = require('cheerio')
const request = require('request-promise')

const siteUrl = 'https://blog.risingstack.com/page/1/'
const mainUrl = 'https://blog.risingstack.com/'

const fetchData = async (siteUrl) => {
	const result = await request(siteUrl);
	return cheerio.load(result);
};

const getResults = async (siteUrl) => {
	const articles = [];
	const $ = await fetchData(siteUrl)
	$('.post-header').each((index, element) => {
		const title = $(element)
			.children()
			.first()
			.text()
		const link = mainUrl + $(element)
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
	return data
}

articlesRouter.get('/:number', async (req, res) => {
	let summa = req.params.number
	let result = []
	for (let i = 1; i <= summa; i++) {
		result.push(await getResults(`https://blog.risingstack.com/page/${i}/`));
	}

	console.log(result)
	res.json(result);
});


module.exports = articlesRouter

