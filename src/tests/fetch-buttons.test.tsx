import React from 'react';
import renderer from 'react-test-renderer';
import { FetchButtons } from '../components/fetch-buttons/fetch-buttons';

it('exists at start', () => {
	const testRenderer = renderer.create(
		<FetchButtons
			setData={() => {
				console.log('test');
			}}
		/>,
	);

	const testInstance = testRenderer.root;

	expect(testInstance).toBeTruthy();
});
