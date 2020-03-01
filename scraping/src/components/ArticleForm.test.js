import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import ArticleForm from './ArticleForm'

const Wrapper = (props) => {

	const onChange = (event) => {
		props.state.value = event.target.value
	}
	return (
		<ArticleForm
			value={props.state.value}
			onSubmit={props.onSubmit}
			handleChange={onChange}
		/>
	)
}

test('<ArticleForm /> updates parent state and calls onSubmit', () => {
	const onSubmit = jest.fn()
	const state = {
		value: ''
	}

	const component = render(
		<Wrapper onSubmit={onSubmit} state={state} />
	)

	const input = component.container.querySelector('input')
	const form = component.container.querySelector('form')

	fireEvent.change(input, { target: { value: 1 } })
	fireEvent.submit(form)

	expect(onSubmit.mock.calls.length).toBe(1)
	expect(state.value).toBe('1')
})