import React, { FC, memo } from 'react';
import s from './Table.module.scss';

export type TCeil = string | number;

export interface ICeilData {
  onClick?: (val: ICeilData) => void;
  text: TCeil;
}
export interface ICeil {
  id: string;
  data: ICeilData[];
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
  const onCurCeilClick = (event: any, data: ICeilData, row: ICeil) => {
    event.stopPropagation();
    data.onClick ? data.onClick(data) : onCeilClick(row);
  };

  return (
    <div className={s.container}>
      <table className={s.table}>
        <tbody>
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
                <td
                  onClick={(e) => onCurCeilClick(e, el, row)}
                  className={s.table__ceil}
                  key={inx}
                >
                  {el.text}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default memo(Table);
