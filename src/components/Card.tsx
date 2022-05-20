import { useRef } from "react";
import { useDrop } from "react-dnd";
import { throttle } from "throttle-debounce-ts";
import { useItemDrag } from "../hooks/useItemDrag";
import { moveTask, setDraggedItem } from "../state/actions";
import { useAppState } from "../state/AppStateContext";
import { CardContainer } from "../styles";
import { isHidden } from "../utils/isHidden";

type CardProps = {
  id: string;
  text: string;
  columnId: string;
  isPreview?: boolean;
};

export const Card = ({ id, text, columnId, isPreview }: CardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { draggedItem, dispatch } = useAppState();
  const { drag } = useItemDrag({
    type: "CARD",
    id,
    text,
    columnId,
  });

  const [, drop] = useDrop({
    accept: "CARD",
    hover: throttle(200, () => {
      if (!draggedItem) {
        return;
      }

      if (draggedItem.type !== "CARD") {
        return;
      }

      if (draggedItem.id === id) {
        return;
      }

      dispatch(moveTask(draggedItem.id, id, draggedItem.columnId, columnId));

      dispatch(setDraggedItem({ ...draggedItem, columnId }));
    }),
  });

  drag(drop(ref));

  return (
    <CardContainer
      ref={ref}
      isHidden={isHidden(draggedItem, "CARD", id, isPreview)}
      isPreview={isPreview}
    >
      {text}
    </CardContainer>
  );
};
