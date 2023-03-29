import React, { FC, memo } from 'react';

import s from './style.module.scss';

interface IProps {
  text?: string;
}

const Loader: FC<IProps> = ({ text = 'Получение данных...' }) => {
  return (
    <>
      <div className={s.shadow} />
      <div className={s.loader}>
        <div className={s.wifiLoader}>
          <svg className={s.circleOuter} viewBox='0 0 86 86'>
            <circle className={s.back} cx='43' cy='43' r='40'></circle>
            <circle className={s.front} cx='43' cy='43' r='40'></circle>
            <circle className={s.new} cx='43' cy='43' r='40'></circle>
          </svg>
          <svg className={s.circleMiddle} viewBox='0 0 60 60'>
            <circle className={s.back} cx='30' cy='30' r='27'></circle>
            <circle className={s.front} cx='30' cy='30' r='27'></circle>
          </svg>
          <svg className={s.circleInner} viewBox='0 0 34 34'>
            <circle className={s.back} cx='17' cy='17' r='14'></circle>
            <circle className={s.front} cx='17' cy='17' r='14'></circle>
          </svg>
          <div className={s.text} data-text={text}></div>
        </div>
      </div>
    </>
  );
};

export default memo(Loader);
