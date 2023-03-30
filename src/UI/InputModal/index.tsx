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
  text?: string;
  onConfirm: (val: string) => void;
  error?: string;
  setError?: Dispatch<SetStateAction<string>>;
  inputType?: string;
}

const InputModal: FC<IProps> = ({
  isVisible,
  setIsVisible,
  title,
  text = '',
  onConfirm,
  inputType = 'text',
  error = '',
  setError = () => {},
}) => {
  const [value, setValue] = useState('');

  const onChange = (val: string) => {
    setValue(val);
    setError('');
  };

  return (
    <div>
      <Modal isVisible={isVisible} setIsVisible={setIsVisible}>
        <>
          <h2>{title}</h2>
          <Gap y={10} />
          <div>{text}</div>
          <Gap y={10} />
          <Input
            value={value}
            errorText={error}
            type={inputType}
            setValue={onChange}
          />
          <Gap y={5} />
          <Gap y={10} />
          <Button text='Confirm' onClick={() => onConfirm(value)} />
        </>
      </Modal>
    </div>
  );
};
export default memo(InputModal);
