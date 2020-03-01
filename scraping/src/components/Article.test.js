import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Article from './Article'


describe('<Article />', () => {

	let component


	beforeEach(() => {
		const article = {
			title: 'https://blog.risingstack.com//update-node-js-latest-version/',
			smallTitles: ['Node.js LTS & Current Download for macOS:']
		}
		component = render(
			<Article article={article} />
		)
	})

	test('renders content', () => {
		expect(component.container).toHaveTextContent(
			'https://blog.risingstack.com//update-node-js-latest-version/'
		)

		const element = component.getByText(
			'https://blog.risingstack.com//update-node-js-latest-version/'
		)
		expect(element).toBeDefined()

		const div = component.container.querySelector('li')
		expect(div).toHaveTextContent(
			'https://blog.risingstack.com//update-node-js-latest-version/'
		)
	})

	test('at start the children are not displayed', () => {
		const div = component.container.querySelector('.togglableContent')
		expect(div).toHaveStyle('display: none')
	})

	test('after clicking the button, children are displayed', () => {
		const button = component.container.querySelector('.article')
		fireEvent.click(button)

		const div = component.container.querySelector('.togglableContent')
		expect(div).not.toHaveStyle('display: none')
	})
})