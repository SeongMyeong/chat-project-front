import React from 'react'
import { useDispatch } from 'react-redux'
import { useSelector, RootState } from 'store'
import { modalActions } from 'store/modal'

interface IProps {
  closeModal: () => void
}

const DeleteModal: React.FC<IProps> = ({ closeModal }) => {
  const dispacth = useDispatch()
  // const modal = useSelector((state: RootState) => state.modal.modal);

  const handleConfirm = () => {
    dispacth(modalActions.initModal())
    closeModal()
  }

  return (
    <>
      <div className="pop-panel">
        <h1 className="pop-panel-hd">알림</h1>
        <div className="pop-panel-cnt">
          <p className="pop-cnt-text">
            정말 다음 게시물을 삭제하시겠어요?
            <br />
            삭제된 게시물은 복구 되지 않습니다.
          </p>
        </div>
        <div className="pop-btn-bar">
          <button
            type="button"
            className="btn btn-sm btn-Secondary"
            onClick={closeModal}
          >
            닫기
          </button>
          <button
            type="button"
            className="btn btn-sm btn-solid"
            onClick={handleConfirm}
          >
            확인
          </button>
        </div>
      </div>
    </>
  )
}

export default DeleteModal
