import React, { useRef } from "react";
import { useDrop } from "react-dnd";
import { throttle } from "throttle-debounce-ts";
import { useItemDrag } from "../hooks/useItemDrag";
import { addTask, moveList } from "../state/actions";
import { useAppState } from "../state/AppStateContext";
import { ColumnContainer, ColumnTitle } from "../styles";
import { isHidden } from "../utils/isHidden";
import { AddNewItem } from "./AddNewItem";
import { Card } from "./Card";

type ColumnProps = {
  id: string;
  text: string;
};

// DIFFERENT WAYS TO DEFINE children PROPS
// type ColumnProps = {
//   text: string;
//   children?: React.ReactNode;
// };

// type ColumnProps = React.PropsWithChildren<{
//   text: string;
// }>;

export const Column: React.FC<ColumnProps> = ({ id, text }) => {
  const { getTasksByListId, dispatch, draggedItem } = useAppState();
  const tasks = getTasksByListId(id);

  const ref = useRef<HTMLDivElement>(null);
  const { drag } = useItemDrag({ type: "COLUMN", id, text });
  const [, drop] = useDrop({
    accept: "COLUMN",
    hover: throttle(200, () => {
      if (!draggedItem) {
        return;
      }
      if (draggedItem.type === "COLUMN") {
        if (draggedItem.id === id) {
          return;
        }
        dispatch(moveList(draggedItem.id, id));
      }
    }),
  });

  drag(drop(ref));
  return (
    <ColumnContainer ref={ref} isHidden={isHidden(draggedItem, "COLUMN", id)}>
      <ColumnTitle>{text}</ColumnTitle>
      {tasks.map((task) => (
        <Card key={task.id} {...task} />
      ))}
      <AddNewItem
        onAdd={(text) => dispatch(addTask(text, id))}
        toggleButtonText="+ Add another card"
        dark
      />
    </ColumnContainer>
  );
};
