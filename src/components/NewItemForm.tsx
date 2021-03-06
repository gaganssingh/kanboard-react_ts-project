import { useState } from "react";
import {
  Button,
  ButtonContainer,
  NewItemFormContainer,
  NewItemInput,
} from "../styles";
import { useFocus } from "../hooks/useFocus";

type NewItemFormProps = {
  onAdd(text: string): void;
  onCancel(): void;
};

export const NewItemForm = ({ onAdd, onCancel }: NewItemFormProps) => {
  const [text, setText] = useState<string>("");
  const inputRef = useFocus();

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setText(e.target.value);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text === "") {
      onCancel();
    } else {
      onAdd(text.trim());
    }
  };

  const handleCancelButton = () => {
    setText("");
    onCancel();
  };

  return (
    <NewItemFormContainer onSubmit={handleFormSubmit}>
      <NewItemInput ref={inputRef} value={text} onChange={onInputChange} />
      <ButtonContainer>
        <Button type="button" cancel onClick={handleCancelButton}>
          Cancel
        </Button>
        <Button type="submit">Create</Button>
      </ButtonContainer>
    </NewItemFormContainer>
  );
};
