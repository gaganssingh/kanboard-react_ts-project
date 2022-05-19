import React from "react";
import { useAppState } from "../state/AppStateContext";
import { ColumnContainer, ColumnTitle } from "../styles";
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
  const { getTasksByListId } = useAppState();

  const tasks = getTasksByListId(id);

  return (
    <ColumnContainer>
      <ColumnTitle>{text}</ColumnTitle>
      {tasks.map((task) => (
        <Card key={task.id} {...task} />
      ))}
      <AddNewItem
        onAdd={console.log}
        toggleButtonText="+ Add another card"
        dark
      />
    </ColumnContainer>
  );
};
