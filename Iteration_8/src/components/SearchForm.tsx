import { type FormEvent, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function SearchForm() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState(searchParams.get('username') || '');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setSearchParams({ username: inputValue.trim() });
    }
  };

  return (
    <div className="border-question">
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username: </label>
        <input
          id="username"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={{ width: '40em' }}
        />
        <button type="submit">Find repositories</button>
      </form>
    </div>
  );
}