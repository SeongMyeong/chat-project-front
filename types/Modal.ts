export type Modal = {
  open?: boolean;
  type?: string;
  title?: any;
  message?: any;
  subMessage?: string;
  confirmButtonMessage?: string;
  cancelButttonMessage?: string;
  checkConfirm?: boolean;
  checkCancle?: boolean;
  data?: any;
  isNeedBackgroundClickBlock?: boolean;
  isToast?: boolean;
  isMultipleLayer?: boolean;
  multipleLayerType?: string;
  className?: string;
  confirmFunction?: (param?: any) => any;
  cancelFunction?: (param?: any) => any;
};
