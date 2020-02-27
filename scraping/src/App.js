import React, { useState, useEffect } from 'react';
import articleService from './services/article'

const App = () => {
  const [articles, setArticles] = useState([])

  useEffect(() => {
    articleService
      .getAll()
      .then(initialArticles => setArticles(initialArticles))
  }, [])

  const rows = () => articles.map(article => <li key={article.id}>{article.title}</li>)

  return (
    <div>
      <h2>articles</h2>
      <ul>
        {rows()}
      </ul>
    </div>
  )
}



export default App;
