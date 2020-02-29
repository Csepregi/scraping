import React, { useState } from 'react'

const Article = ({ article }) => {

	const [showDetails, setShowDetails] = useState(false);

	const visible = { display: showDetails ? '' : 'none' }

	const toggleDetails = () => {
		setShowDetails(!showDetails);
	};

	return (
		<div>
			<li key={article.title} onClick={toggleDetails}>{article.title}
				{article.smallTitles.map((small) =>
					<p style={visible}>{small}</p>
				)}
			</li>
		</div>
	)
}

export default Article