import React, { FC, Key, memo, useCallback, useMemo } from 'react';

interface IProps {
  data: any[];
  renderItem: (item: any, index: number) => JSX.Element;
  renderKey?: (item: any, index: number) => Key;
  emptyElement?: JSX.Element;
  containerClassname?: string;
  itemClassname?: string;
  emptyClassname?: string;
  loading?: boolean;
}

const List: FC<IProps> = ({
  data,
  renderItem,
  emptyElement = <div>Пусто</div>,
  renderKey,
  containerClassname = '',
  itemClassname = '',
  emptyClassname = '',
  loading = false,
}) => {
  const onRenderKey = useCallback(
    (el: any, inx: number) => (renderKey ? renderKey(el, inx) : inx),
    []
  );

  const emptyComponent = useMemo(
    () => <div className={emptyClassname}>{emptyElement}</div>,
    []
  );

  return (
    <div className={containerClassname}>
      {loading ? (
        <div>Loading...</div>
      ) : !!data.length ? (
        data.map((el, inx) => (
          <div className={itemClassname} key={onRenderKey(el, inx)}>
            {renderItem(el, inx)}
          </div>
        ))
      ) : (
        emptyComponent
      )}
    </div>
  );
};

export default memo(List);
