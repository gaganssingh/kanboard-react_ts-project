import { AddNewItem } from "./components/AddNewItem";
import { Column } from "./components/Column";
import { AppContainer } from "./styles";

export const App = () => {
  return (
    <AppContainer>
      <Column text="Todo:" />
      <AddNewItem onAdd={console.log} toggleButtonText="+ Add another list" />
    </AppContainer>
  );
};
