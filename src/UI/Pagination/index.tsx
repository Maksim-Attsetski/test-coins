import React, { FC, memo, useMemo, useState } from 'react';
import Button from 'UI/Button';
import s from './Pagination.module.scss';

interface IProps {
  page: number;
  maxPage: number;
  onChange?: (val: number) => void;
  containerClassName?: string;
}

const Pagination: FC<IProps> = ({
  maxPage,
  page,
  containerClassName = '',
  onChange = () => {},
}) => {
  const [activePage, setActivePage] = useState(page);

  const pagesArray = useMemo(() => {
    const arr =
      activePage > 2
        ? [
            activePage - 2,
            activePage - 1,
            activePage,
            activePage + 1 < maxPage ? activePage + 1 : -1,
            activePage + 2 < maxPage ? activePage + 2 : -1,
          ]
        : [0, 1, 2, 3, 4];

    return arr.filter((el) => el >= 0);
  }, [activePage]);

  const onChangePage = (index: number) => {
    setActivePage(index);
    onChange(index);
  };

  return (
    <div className={s.container + ' ' + containerClassName}>
      {activePage > 2 && (
        <Button
          className={[s.btn, activePage === 0 ? s.active : ''].join(' ')}
          text={1 + ''}
          onClick={() => onChangePage(1)}
        />
      )}
      {activePage > 10 && (
        <Button
          className={s.btn}
          text={'-10'}
          onClick={() => onChangePage(activePage - 10)}
        />
      )}
      {pagesArray.map((el) => (
        <Button
          key={el}
          className={[s.btn, activePage === el ? s.active : ''].join(' ')}
          text={el + 1 + ''}
          onClick={() => onChangePage(el)}
        />
      ))}
      {activePage < maxPage - 9 && (
        <Button
          className={s.btn}
          text={'+10'}
          onClick={() => onChangePage(activePage + 10)}
        />
      )}
      {activePage !== maxPage && (
        <Button
          className={[s.btn, activePage === maxPage ? s.active : ''].join(' ')}
          text={maxPage + ''}
          onClick={() => onChangePage(maxPage)}
        />
      )}
    </div>
  );
};
export default memo(Pagination);
