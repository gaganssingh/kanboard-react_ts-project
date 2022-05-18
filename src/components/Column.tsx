import React from "react";
import { ColumnContainer, ColumnTitle } from "../styles";
import { AddNewItem } from "./AddNewItem";
import { Card } from "./Card";

type ColumnProps = {
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

export const Column: React.FC<ColumnProps> = ({ text }) => {
  return (
    <ColumnContainer>
      <ColumnTitle>{text}</ColumnTitle>
      <Card text="Make kanboard" />
      <Card text="Learn typescript" />
      <Card text="Buy milk" />
      <AddNewItem
        onAdd={console.log}
        toggleButtonText="+ Add another card"
        dark
      />
    </ColumnContainer>
  );
};
