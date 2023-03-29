import { bindActionCreators } from 'redux';

import { coinActions } from 'widgets/Coin';
import { useTypedDispatch } from './redux';

const useActions = () => {
  const dispatch = useTypedDispatch();

  const allActions = {
    ...coinActions,
  };

  const action = bindActionCreators(allActions, dispatch);

  return { action };
};

export default useActions;
