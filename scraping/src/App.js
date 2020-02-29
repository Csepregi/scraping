//import React, { useState, useEffect } from 'react';
import React, { useState } from 'react';
import articleService from './services/article'
import Article from './components/Article';

const App = () => {
  const [articles, setArticles] = useState([])
  const [articlenumber, setArticleNumber] = useState('')


  const getArticle = (event) => {
    event.preventDefault()

    articleService
      .getAll(articlenumber)
      .then(initialArticles => setArticles(initialArticles))
    setArticleNumber('')
  }

  const onChange = (event) => {
    setArticleNumber(event.target.value)
  }

  const rows = () => articles.flat().map((article) =>
    <Article article={article} />
  )

  return (
    <div>
      <h2>articles</h2>
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
