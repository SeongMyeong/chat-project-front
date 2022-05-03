import ComponentDepth3 from 'components/notRedux/ComponentDepth3';

const ComponentDepth2 = ({ number }: any) => {
  return <ComponentDepth3 number={number} />;
};
export default ComponentDepth2;
