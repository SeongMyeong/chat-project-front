import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import CloseXIcon from '../../public/static/svg/modal/modal_colose_x_icon.svg';
import palette from '../../styles/palette';
import Button from '../common/Button';
import useValidateMode from '../../hooks/useValidateMode';
import { useSelector, RootState } from '../../store';

const Container = styled.form`
  width: 568px;
  padding: 32px;
  background-color: white;
  z-index: 11;

  .mordal-close-x-icon {
    cursor: pointer;
    display: block;
    margin: 0 0 20px auto;
  }

  .login-input-wrapper {
    position: relative;
    margin-bottom: 16px;
    text-align: center;
  }

  .login-password-input-wrapper {
    svg {
      cursor: pointer;
    }
  }

  .login-modal-submit-button-wrapper {
    margin-bottom: 16px;
    padding-bottom: 16px;
    border-bottom: 1px solid ${palette.gray_eb};
  }
  .login-modal-set-signup {
    color: ${palette.dark_cyan};
    margin-left: 8px;
    cursor: pointer;
  }
`;

interface IProps {
  closeModal: () => void;
}

const ErrorModal: React.FC<IProps> = ({ closeModal }) => {
  const { setValidateMode } = useValidateMode();
  const modal = useSelector((state: RootState) => state.modal.modal);

  const onSubmitLogin = async (event: React.FormEvent<HTMLFormElement>) => {};

  useEffect(() => {
    return () => {
      setValidateMode(false);
    };
  }, [setValidateMode]);

  return (
    <Container onSubmit={onSubmitLogin}>
      <CloseXIcon className="mordal-close-x-icon" onClick={closeModal} />
      <div className="login-input-wrapper">{modal.title}</div>
      <div className="login-input-wrapper login-password-input-wrapper">
        {modal.message}
      </div>
      <div className="login-modal-submit-button-wrapper">
        <Button type="button" color="bittersweet" onClick={closeModal}>
          확인
        </Button>
      </div>
    </Container>
  );
};

export default ErrorModal;
