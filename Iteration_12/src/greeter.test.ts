import { sayHello, getConfig } from './greeter';

jest.mock('./greeter', () => ({
  ...jest.requireActual('./greeter'),
  getConfig: jest.fn(() => ({ language: 'ru' })),
}));

describe('mocked module', () => {
  test('sayHello works as usual', () => {
    expect(sayHello('Alice')).toBe('Hello, Alice!');
  });

  test('getConfig returns mocked value', () => {
    const config = getConfig();
    expect(config).toEqual({ language: 'ru' });
    expect(getConfig).toHaveBeenCalledTimes(1);
  });
});