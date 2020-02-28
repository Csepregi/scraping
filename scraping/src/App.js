//import React, { useState, useEffect } from 'react';
import React, { useState } from 'react';
import articleService from './services/article'

const App = () => {
  const [articles, setArticles] = useState([])
  const [articlenumber, setArticleNumber] = useState('')


  const getArticle = (event) => {
    event.preventDefault()

    articleService
      .getAll()
      .then(initialArticles => setArticles(initialArticles))
    setArticleNumber('')
  }


  const rows = () => articles.flat().map((article) =>
    <ul key={article.title}>{article.title}
      <li>{article.smallTitles}</li>
    </ul>
  )

  return (
    <div>
      <h2>articles</h2>
      <h2>Get Articles</h2>
      <form onSubmit={getArticle}>
        <div>
          <input
            value={articlenumber}
            onChange={(target) => setArticleNumber(target.value)}
          />
        </div>
        <button type="submit">get it</button>
      </form>
      <ul>
        {rows()}
      </ul>
    </div>
  )
}



export default App;
