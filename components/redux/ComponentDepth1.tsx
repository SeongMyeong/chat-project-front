import ComponentDepth2 from 'components/redux/ComponentDepth2';
import { useDispatch } from 'react-redux';
import { testActions } from 'store/test';
import { useSelector, RootState } from 'store';

const Component1 = () => {
  const dispatch = useDispatch();
  const number = useSelector((state: RootState) => state.test.number);

  const handleNumber = (action: string) => {
    if (action === 'plus') dispatch(testActions.setNumber(number + 1));
    if (action === 'minus') dispatch(testActions.setNumber(number - 1));
  };
  return (
    <div>
      <button onClick={() => handleNumber('plus')}>+</button>
      <button onClick={() => handleNumber('minus')}>-</button>
      <ComponentDepth2 />
    </div>
  );
};
export default Component1;
