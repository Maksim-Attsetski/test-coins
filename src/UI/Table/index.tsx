import React, { FC, memo } from 'react';
import s from './Table.module.scss';

export interface ITable {
  title: string;
  rows: string[];
}

interface IProps {
  table?: ITable[];
  onCeilClick?: (val: ITable) => void;
}

const Table: FC<IProps> = ({ table = [], onCeilClick = () => {} }) => {
  return (
    <div className={s.table}>
      {table.map(({ rows, title }, inx) => (
        <div className={s.table__body} key={inx + title}>
          <div className={s.table__head}>{title}</div>
          {rows.map((row, i) => (
            <div
              key={i}
              onClick={() => onCeilClick({ rows, title })}
              className={s.table__ceil}
            >
              {row}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
export default memo(Table);
