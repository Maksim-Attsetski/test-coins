import React, { FC, memo } from 'react';
import { useNavigate } from 'react-router-dom';

import { routeNames } from 'navigation/types';

import s from './style.module.scss';

interface IProps {
  setIsOpen: (val: boolean) => void;
  isOpen: boolean;
}

const _Header: FC<IProps> = ({ setIsOpen, isOpen }) => {
  const navigate = useNavigate();

  return (
    <header className={s.header}>
      <div className={'container ' + s.headerBody}>header</div>
    </header>
  );
};

export default memo(_Header);
