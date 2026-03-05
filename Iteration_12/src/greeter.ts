export const sayHello = (name: string): string => `Hello, ${name}!`;

export const getConfig = (): { language: string } => {
  return { language: 'en' };
};