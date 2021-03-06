import React, { useRef } from "react";
import { useDrop } from "react-dnd";
import { throttle } from "throttle-debounce-ts";
import { useItemDrag } from "../hooks/useItemDrag";
import { addTask, moveList, moveTask, setDraggedItem } from "../state/actions";
import { useAppState } from "../state/AppStateContext";
import { ColumnContainer, ColumnTitle } from "../styles";
import { isHidden } from "../utils/isHidden";
import { AddNewItem } from "./AddNewItem";
import { Card } from "./Card";

type ColumnProps = {
  id: string;
  text: string;
  isPreview?: boolean;
};

// DIFFERENT WAYS TO DEFINE children PROPS
// type ColumnProps = {
//   text: string;
//   children?: React.ReactNode;
// };

// type ColumnProps = React.PropsWithChildren<{
//   text: string;
// }>;

export const Column: React.FC<ColumnProps> = ({ id, text, isPreview }) => {
  const { getTasksByListId, dispatch, draggedItem } = useAppState();
  const tasks = getTasksByListId(id);

  const ref = useRef<HTMLDivElement>(null);
  const { drag } = useItemDrag({ type: "COLUMN", id, text });
  const [, drop] = useDrop({
    accept: ["COLUMN", "CARD"],
    hover: throttle(200, () => {
      if (!draggedItem) {
        return;
      }
      if (draggedItem.type === "COLUMN") {
        if (draggedItem.id === id) {
          return;
        }
        dispatch(moveList(draggedItem.id, id));
      } else {
        if (draggedItem.columnId === id) {
          return;
        }
        if (tasks.length) {
          return;
        }
        dispatch(moveTask(draggedItem.id, null, draggedItem.columnId, id));
        dispatch(setDraggedItem({ ...draggedItem, columnId: id }));
      }
    }),
  });

  drag(drop(ref));
  return (
    <ColumnContainer
      ref={ref}
      isHidden={isHidden(draggedItem, "COLUMN", id, isPreview)}
      isPreview={isPreview}
    >
      <ColumnTitle>{text}</ColumnTitle>
      {tasks.map((task) => (
        <Card key={task.id} id={task.id} text={task.text} columnId={id} />
      ))}
      <AddNewItem
        onAdd={(text) => dispatch(addTask(text, id))}
        toggleButtonText="+ Add another card"
        dark
      />
    </ColumnContainer>
  );
};
