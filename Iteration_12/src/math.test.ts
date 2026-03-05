import {
  add,
  multiply,
  isEven,
  divide,
  getFullName,
  filterPositive,
  fetchUser,
} from './math';

describe('math functions', () => {
  test('add returns sum', () => {
    expect(add(2, 3)).toBe(5);
  });

  test('multiply returns product', () => {
    expect(multiply(4, 5)).toEqual(20);
  });

  test('isEven returns true for even numbers', () => {
    expect(isEven(4)).toBeTruthy();
  });

  test('isEven returns false for odd numbers', () => {
    expect(isEven(5)).toBeFalsy();
  });

  test('divide throws on zero divisor', () => {
    expect(() => divide(10, 0)).toThrow('Division by zero');
  });

  test('getFullName returns concatenated name', () => {
    expect(getFullName('Jane', 'Doe')).toMatch(/Jane Doe/);
  });

  test('filterPositive returns only positive numbers', () => {
    const result = filterPositive([-1, 2, -3, 4]);
    expect(result).toHaveLength(2);
    expect(result).toContain(2);
    expect(result).not.toContain(-1);
    expect(result).toEqual([2, 4]);
  });

  test('add result is greater than first operand', () => {
    expect(add(5, 3)).toBeGreaterThan(5);
  });

  test('multiply result is less than or equal to something', () => {
    expect(multiply(2, 3)).toBeLessThanOrEqual(6);
  });

  test('fetchUser returns object with expected shape', async () => {
    const user = await fetchUser(42);
    expect(user).toHaveProperty('id', 42);
    expect(user).toMatchObject({ id: 42, name: expect.any(String) });
  });

  test('fetchUser resolves to an object', async () => {
    await expect(fetchUser(1)).resolves.toEqual({ id: 1, name: 'John Doe' });
  });
});