import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import Button from 'UI/Button';
import Modal from 'UI/Modal';

import s from './InputModal.module.scss';

interface IProps {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  title: string;
  onConfirm: (val: string) => void;
  error?: string;
}

const InputModal: FC<IProps> = ({
  isVisible,
  setIsVisible,
  title,
  onConfirm,
  error = '',
}) => {
  const [value, setValue] = useState('');

  return (
    <div>
      <Modal isVisible={isVisible} setIsVisible={setIsVisible}>
        <>
          <h2>{title}</h2>
          <input
            type='text'
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          {!!error.length && <div className={s.error}>{error}</div>}
          <Button text='Confirm' onClick={() => onConfirm(value)} />
        </>
      </Modal>
    </div>
  );
};
export default InputModal;
