//import React, { useState, useEffect } from 'react';
import React, { useState } from 'react';
import articleService from './services/article'

const App = () => {
  const [articles, setArticles] = useState([])
  const [articlenumber, setArticleNumber] = useState('')


  const getArticle = (event) => {
    event.preventDefault()
    //let number = { articlenumber }

    articleService
      .getAll(articlenumber)
      .then(initialArticles => setArticles(initialArticles))
    setArticleNumber('')
  }

  const onChange = (event) => {
    setArticleNumber(event.target.value)
  }

  const rows = () => articles.flat().map((article) =>
    <div>
      <li key={article.title}>{article.title}
        {article.smallTitles.map((small) =>
          <p>{small}</p>
        )}
      </li>
    </div>
  )

  return (
    <div>
      <h2>articles</h2>
      <h2>Get Articles</h2>
      <form onSubmit={getArticle}>
        <div>
          <input
            value={articlenumber}
            onChange={onChange}
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
