import React, {
  Dispatch,
  FC,
  memo,
  ReactElement,
  ReactNode,
  SetStateAction,
  useEffect,
} from 'react';
import s from './Modal.module.scss';

interface IProps {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  onOpen?: () => void;
  onClose?: () => void;
  children: ReactNode | ReactElement;
}

const Modal: FC<IProps> = ({
  isVisible,
  setIsVisible,
  onClose = () => {},
  onOpen = () => {},
  children,
}) => {
  const onModalOpen = () => {
    onOpen();
    document.body.classList.add('lock');
  };

  const onModalClose = () => {
    onClose();
    document.body.classList.remove('lock');
  };

  const onClickClose = () => {
    onModalClose();
    setIsVisible(false);
  };

  useEffect(() => {
    isVisible ? onModalOpen() : onClose();
  }, [isVisible]);

  return (
    <div
      className={[s.container, isVisible ? s.active : ''].join(' ')}
      onClick={onClickClose}
    >
      <div className={s.modal} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};
export default memo(Modal);
