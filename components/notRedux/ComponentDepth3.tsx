import ComponentDepth4 from 'components/notRedux/ComponentDepth4';

const ComponentDepth3 = ({ number }: any) => {
  return (
    <div>
      <ComponentDepth4 number={number} />
    </div>
  );
};
export default ComponentDepth3;
