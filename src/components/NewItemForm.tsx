import { useState } from "react";
import { NewItemButton, NewItemFormContainer, NewItemInput } from "../styles";
import { useFocus } from "../utils/useFocus";

type NewItemFormProps = {
  onAdd(text: string): void;
};

export const NewItemForm = ({ onAdd }: NewItemFormProps) => {
  const [text, setText] = useState<string>("");
  const inputRef = useFocus();

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setText(e.target.value);

  return (
    <NewItemFormContainer>
      <NewItemInput ref={inputRef} value={text} onChange={onInputChange} />
      <NewItemButton onClick={() => onAdd(text)}>Create</NewItemButton>
    </NewItemFormContainer>
  );
};
