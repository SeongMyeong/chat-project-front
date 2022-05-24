import styled from 'styled-components';
import { modalActions } from 'store/modal';
import ModalContainer from 'components/modal/ModalContainer';
import ModalPortal from 'components/base/ModalPortal';
import { useSelector, RootState } from 'store';
import { useDispatch } from 'react-redux';

const St = {
  LayoutWrapper: styled.div`
    height: 100vh;
  `
};
const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const modal = useSelector((state: RootState) => state.modal.modal);
  const closeModal = () => {
    if (!modal.isNeedBackgroundClickBlock) {
      dispatch(modalActions.closeModal());
    }
  };
  console.log('layout = modal', modal);
  return (
    <St.LayoutWrapper id="root-modal">
      <ModalPortal
        modalOpened={modal.open}
        closePortal={closeModal}
        isToast={modal.isToast}
      >
        <ModalContainer closeModal={closeModal} />
      </ModalPortal>
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
