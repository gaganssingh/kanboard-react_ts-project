import { AddNewItem } from "./components/AddNewItem";
import { Column } from "./components/Column";
import { addList } from "./state/actions";
import { useAppState } from "./state/AppStateContext";
import { AppContainer } from "./styles";

export const App = () => {
  const { lists, dispatch } = useAppState();

  return (
    <AppContainer>
      {lists.map((list) => (
        <Column key={list.id} {...list} />
      ))}
      <AddNewItem
        onAdd={(text) => dispatch(addList(text))}
        toggleButtonText="+ Add another list"
      />
    </AppContainer>
  );
};
