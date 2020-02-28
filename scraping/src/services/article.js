import axios from 'axios'
const baseUrl = '/api/articles'

const getAll = (number) => {
	const request = axios.get(`${baseUrl}/${number}`)
	return request.then(response => response.data)
}

export default { getAll }