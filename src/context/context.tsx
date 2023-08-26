import { ReactNode, createContext, useReducer } from 'react';
import { languages } from '../constants';

interface IState {
  language: null | string;
  theme: Theme;
}
interface IContext {
  state: IState | null;
  changeLanguage: ((langId: string) => void) | null;
  changeTheme: ((theme: Theme) => void) | null;
}
type Theme = 'dark' | 'light';
enum ActionTypes {
  CHANGE_LANGUAGE_ACTION = 'CHANGE_LANGUAGE_ACTION',
  CHANGE_THEME_ACTION = 'CHANGE_THEME_ACTION',
}
type CHANGE_LANGUAGE_ACTION = {
  type: ActionTypes.CHANGE_LANGUAGE_ACTION;
  payload: string;
};
type CHANGE_THEME_ACTION = {
  type: ActionTypes.CHANGE_THEME_ACTION;
  payload: Theme;
};
type Actions = CHANGE_LANGUAGE_ACTION | CHANGE_THEME_ACTION;

const initialState: IState = {
  language: languages[1].id,
  theme: 'light',
};

const initialContext: IContext = {
  state: null,
  changeLanguage: null,
  changeTheme: null,
};

export const AppContext = createContext(initialContext);

function reducerFn(state: IState, { type, payload }: Actions) {
  switch (type) {
    case ActionTypes.CHANGE_LANGUAGE_ACTION: {
      return {
        ...state,
        language: payload,
      };
    }
    case ActionTypes.CHANGE_THEME_ACTION: {
      return {
        ...state,
        theme: payload,
      };
    }
    default: {
      return state;
    }
  }
}

export default function ContextProvider({
  children,
}: {
  children: ReactNode | null;
}) {
  const [state, dispatch] = useReducer(reducerFn, initialState);

  function changeLanguage(langId: string) {
    dispatch({ type: ActionTypes.CHANGE_LANGUAGE_ACTION, payload: langId });
  }

  function changeTheme(theme: Theme) {
    dispatch({ type: ActionTypes.CHANGE_THEME_ACTION, payload: theme });
  }

  return (
    <AppContext.Provider
      value={{
        state: state,
        changeLanguage,
        changeTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
