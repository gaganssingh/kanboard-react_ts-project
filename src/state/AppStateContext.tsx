import { createContext, Dispatch, useContext } from "react";
import { useImmerReducer } from "use-immer";
import { DragItem } from "../lib/DragItem";
import { Action } from "./actions";
import { AppState, AppStateReducer, List, Task } from "./appStateReducer";

const appData: AppState = {
  lists: [
    {
      id: "0",
      text: "To Do",
      tasks: [{ id: "c0", text: "Generate app scaffold" }],
    },
    {
      id: "1",
      text: "In Progress",
      tasks: [{ id: "c2", text: "Learn Typescript" }],
    },
    {
      id: "2",
      text: "Done",
      tasks: [{ id: "c3", text: "Begin to use static typing" }],
    },
  ],
  draggedItem: null,
};

type AppStateContextProps = {
  lists: List[];
  getTasksByListId(id: string): Task[];
  dispatch: Dispatch<Action>;
  draggedItem: DragItem | null;
};

const AppStateContext = createContext({} as AppStateContextProps);

type ChildrenProp = {
  children?: React.ReactNode;
};

export const AppStateProvider = ({ children }: ChildrenProp) => {
  const [state, dispatch] = useImmerReducer(AppStateReducer, appData);
  const { lists, draggedItem } = state;

  const getTasksByListId = (id: string) => {
    return lists.find((list) => list.id === id)?.tasks || [];
  };

  return (
    <AppStateContext.Provider
      value={{
        lists,
        getTasksByListId,
        dispatch,
        draggedItem,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

// Custom hook
export const useAppState = () => useContext(AppStateContext);
