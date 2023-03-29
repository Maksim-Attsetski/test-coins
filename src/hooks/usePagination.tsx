import { useState } from 'react';

const usePagination = (defaultLimit: number = 10) => {
  const [limit, setLimit] = useState<number>(defaultLimit);
  const [offset, setOffset] = useState<number>(0);

  const onNextPage = () => {
    setOffset((prev) => ++prev);
  };
  const onPrevPage = () => {
    setOffset((prev) => --prev);
  };

  const onMoreContent = () => {
    setLimit((prev) => (prev += defaultLimit));
  };

  return { limit, offset, onNextPage, onPrevPage, onMoreContent };
};
export default usePagination;
