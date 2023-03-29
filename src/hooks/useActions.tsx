import { bindActionCreators } from 'redux';

import { useTypedDispatch } from './redux';

const useActions = () => {
  const dispatch = useTypedDispatch();

  const allActions = {};

  const action = bindActionCreators(allActions, dispatch);

  return { action };
};

export default useActions;
