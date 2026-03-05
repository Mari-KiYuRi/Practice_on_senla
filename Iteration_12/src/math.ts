export const add = (a: number, b: number): number => a + b;

export const multiply = (a: number, b: number): number => a * b;

export const isEven = (n: number): boolean => n % 2 === 0;

export const divide = (a: number, b: number): number => {
  if (b === 0) throw new Error('Division by zero');
  return a / b;
};

export const getFullName = (first: string, last: string): string =>
  `${first} ${last}`;

export const filterPositive = (arr: number[]): number[] =>
  arr.filter(n => n > 0);

export const fetchUser = async (id: number): Promise<{ id: number; name: string }> => {
  return { id, name: 'John Doe' };
};