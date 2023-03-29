import React, { FC, memo } from 'react';
import s from './Table.module.scss';

export type TCeil = string | number;

export interface ICeil {
  id: string;
  data: TCeil[];
}

interface IProps {
  head?: string[];
  rows?: ICeil[];
  onCeilClick?: (val: ICeil) => void;
}

const Table: FC<IProps> = ({
  head = [],
  rows = [],
  onCeilClick = () => {},
}) => {
  return (
    <table className={s.table}>
      <tr className={s.table__head}>
        {head.map((el) => (
          <th key={el} className={s.table__ceil}>
            {el}
          </th>
        ))}
      </tr>
      {rows.map((row, i) => (
        <tr
          key={i}
          onClick={() => onCeilClick(row)}
          className={s.tableContainer}
        >
          {row.data.map((el, inx) => (
            <td className={s.table__ceil} key={inx}>
              {el}
            </td>
          ))}
        </tr>
      ))}
    </table>
  );
};
export default memo(Table);
