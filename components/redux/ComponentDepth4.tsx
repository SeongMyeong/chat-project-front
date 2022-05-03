import { useSelector, RootState } from 'store';

const ComponentDepth4 = () => {
  const number = useSelector((state: RootState) => state.test.number);

  return <div>number = {number}</div>;
};
export default ComponentDepth4;
