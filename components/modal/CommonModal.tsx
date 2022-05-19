import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { useSelector, RootState } from 'store'
import { modalActions } from 'store/modal'
import Button from 'components/common/Button'

const St = {
  PopPanel: styled.div`
    background: #fff;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
  `,
  PopPanelHd: styled.h1`
    padding: 0 30px;
    font-size: 22px;
    font-weight: 600;
    height: 29px;
    line-height: 29px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,

  PopPanelContainer: styled.div`
    padding: 0 30px;
    min-width: 420px;
    width: calc(100% - 5px);
    height: inherit;

    span.error-txt {
      font-size: 15px;
      margin-top: 10px;
      display: block;
    }
  `,
  PopButtonContainer: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding: 20px 30px 30px;
    button {
      margin-right: 5px;
    }
  `
}

interface IProps {
  closeModal: () => void
}

const CommonModal: React.FC<IProps> = ({ closeModal }) => {
  const dispatch = useDispatch()
  const modal = useSelector((state: RootState) => state.modal.modal)

  const handleConfirm = () => {
    if (modal.confirmFunction) modal.confirmFunction()
    else {
      dispatch(modalActions.initModal())
      closeModal()
    }
  }
  const handleCancel = () => {
    if (modal.cancelFunction) modal.cancelFunction()
    else {
      dispatch(modalActions.initModal())
      closeModal()
    }
  }

  return (
    <>
      <St.PopPanel>
        <St.PopPanelHd>알림</St.PopPanelHd>
        <St.PopPanelContainer>
          <p>
            {modal.message}
            <br />
            {modal.subMessage}
          </p>
          <span className="error-txt">{}</span>
        </St.PopPanelContainer>
        <St.PopButtonContainer>
          <Button
            type="button"
            onClick={handleCancel}
            size="small"
            color="red_6"
          >
            닫기
          </Button>
          <Button type="button" onClick={handleConfirm} size="small">
            확인
          </Button>
        </St.PopButtonContainer>
      </St.PopPanel>
    </>
  )
}

export default CommonModal
