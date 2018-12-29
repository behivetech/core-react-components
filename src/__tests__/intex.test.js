import index from '../index';
// jest.mock('../index');

describe('index', () => {
	it('should contain all of the components', () => {
		expect(Object.keys(index)).toMatchSnapshot();
	});
});