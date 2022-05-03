import ComponentDepth2 from 'components/notRedux/ComponentDepth2';
import { useState } from 'react';

const Component1 = () => {
  const [number, setNumber] = useState(0);

  const handleNumber = (action: string) => {
    if (action === 'plus') setNumber((prev) => prev + 1);
    if (action === 'minus') setNumber((prev) => prev - 1);
  };

  return (
    <div>
      <button onClick={() => handleNumber('plus')}>+</button>
      <button onClick={() => handleNumber('minus')}>-</button>
      <ComponentDepth2 number={number} />
    </div>
  );
};
export default Component1;
