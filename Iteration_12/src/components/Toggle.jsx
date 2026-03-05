import { useState } from 'react';

export const Toggle = () => {
  const [isOn, setIsOn] = useState(false);

  return (
    <div>
      <p data-testid="status">{isOn ? 'ON' : 'OFF'}</p>
      <button onClick={() => setIsOn(prev => !prev)}>Toggle</button>
    </div>
  );
};