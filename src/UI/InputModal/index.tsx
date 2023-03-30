import React, { Dispatch, FC, memo, SetStateAction, useState } from 'react';
import Button from 'UI/Button';
import Gap from 'UI/Gap';
import Input from 'UI/Input';
import Modal from 'UI/Modal';

import s from './InputModal.module.scss';

interface IProps {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  title: string;
  onConfirm: (val: string) => void;
  error?: string;
  inputType?: string;
}

const InputModal: FC<IProps> = ({
  isVisible,
  setIsVisible,
  title,
  onConfirm,
  inputType = 'text',
  error = '',
}) => {
  const [value, setValue] = useState('');

  return (
    <div>
      <Modal isVisible={isVisible} setIsVisible={setIsVisible}>
        <>
          <h2>{title}</h2>
          <Gap y={10} />
          <Input value={value} type={inputType} setValue={setValue} />
          <Gap y={5} />
          {!!error.length && <div className={s.error}>{error}</div>}
          <Gap y={10} />
          <Button text='Confirm' onClick={() => onConfirm(value)} />
        </>
      </Modal>
    </div>
  );
};
export default memo(InputModal);
