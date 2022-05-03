import styled from 'styled-components';

const St = {
  LayoutWrapper: styled.div`
    height: 100vh;
  `
};
const Layout = ({ children }) => {
  return (
    <St.LayoutWrapper>
      <div
        style={{ height: '40px', fontWeight: 'bold' }}
        className="flex-center"
      >
        HEADER
      </div>
      {children}
    </St.LayoutWrapper>
  );
};
export default Layout;
