const articlesRouter = require('express').Router()
const getArticles = require('../services/articles')


articlesRouter.get('/:number', async (req, res) => {
	let requestPageNumber = req.params.number
	let result = []
	for (let i = 1; i <= requestPageNumber; i++) {
		result.push(await getArticles(`https://blog.risingstack.com/page/${i}/`));
	}

	console.log(result)
	res.json(result);
});


module.exports = articlesRouter

