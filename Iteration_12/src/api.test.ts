import { fetchTodo } from './api';

global.fetch = jest.fn();

describe('api', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  test('fetchTodo calls fetch with correct URL and returns data', async () => {
    const mockTodo = { title: 'Test Todo' };
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockTodo,
    });

    const result = await fetchTodo(1);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/todos/1');
    expect(result).toEqual(mockTodo);
  });

  test('fetchTodo throws on network error', async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: false,
    });

    await expect(fetchTodo(2)).rejects.toThrow('Failed to fetch');
  });
});