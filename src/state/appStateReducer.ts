import { nanoid } from "nanoid";
import { DragItem } from "../lib/DragItem";
import { findItemIndexById, moveItem } from "../utils/arrayUtils";
import { Action } from "./actions";

export type Task = {
  id: string;
  text: string;
};

export type List = {
  id: string;
  text: string;
  tasks: Task[];
};

export type AppState = {
  lists: List[];
  draggedItem: DragItem | null;
};

export const AppStateReducer = (
  draft: AppState,
  action: Action
): AppState | void => {
  let targetListIndex;
  let dragIndex;
  let hoverIndex;

  switch (action.type) {
    case "ADD_LIST":
      // Using immer to directly *mutate the state
      draft.lists.push({
        id: nanoid(),
        text: action.payload,
        tasks: [],
      });
      break;
    case "ADD_TASK":
      const { text, listId } = action.payload;
      targetListIndex = findItemIndexById(draft.lists, listId);
      draft.lists[targetListIndex].tasks.push({
        id: nanoid(),
        text,
      });
      break;
    case "MOVE_LIST":
      const { draggedId, hoverId } = action.payload;
      dragIndex = findItemIndexById(draft.lists, draggedId);
      hoverIndex = findItemIndexById(draft.lists, hoverId);
      draft.lists = moveItem(draft.lists, dragIndex, hoverIndex);
      break;
    case "MOVE_TASK":
      const { draggedItemId, hoveredItemId, sourceColumnId, targetColumnId } =
        action.payload;
      const sourceListIndex = findItemIndexById(draft.lists, sourceColumnId);

      targetListIndex = findItemIndexById(draft.lists, targetColumnId);

      dragIndex = findItemIndexById(
        draft.lists[sourceListIndex].tasks,
        draggedItemId
      );

      hoverIndex = hoveredItemId
        ? findItemIndexById(draft.lists[targetListIndex].tasks, hoveredItemId)
        : 0;

      const item = draft.lists[sourceListIndex].tasks[dragIndex];
      // Remove the task from the source list
      draft.lists[sourceListIndex].tasks.splice(dragIndex, 1);

      // Add the task to the target list
      draft.lists[targetListIndex].tasks.splice(hoverIndex, 0, item);

      break;
    case "SET_DRAGGED_ITEM":
      draft.draggedItem = action.payload;
      break;
    default:
      return draft;
  }
};
