export const fetchTodo = async (id: number): Promise<{ title: string }> => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
  if (!response.ok) throw new Error('Failed to fetch');
  return response.json();
};