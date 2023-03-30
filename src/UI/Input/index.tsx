import React, {
  ChangeEvent,
  DetailedHTMLProps,
  Dispatch,
  FC,
  InputHTMLAttributes,
  memo,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

import s from './Input.module.scss';

interface IProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  setValue: Dispatch<SetStateAction<string>> | ((val: string) => void);
  errorText?: string;
}

const Input: FC<IProps> = ({
  className = '',
  setValue,
  errorText = '',
  ...props
}) => {
  return (
    <div>
      <input
        {...props}
        className={[s.input, className].join(' ')}
        onChange={(e) => setValue(e.target.value)}
      />
      {errorText && <div className={s.error}>{errorText}</div>}
    </div>
  );
};
export default memo(Input);
