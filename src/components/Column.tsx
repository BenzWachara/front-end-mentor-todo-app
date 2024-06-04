import { TodoListType } from "./TodoList";
import ICON_CHECK from "../assets/icon-check.svg";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";

type ColumnPropsType = {
  data: TodoListType[];
  onChange: (id: string) => void;
};

export type TaskType = {
  id: string;
  title: string;
  check: boolean;
  index: number;
};

const Column = (props: ColumnPropsType) => {
  const Task = ({ id, title, check, index }: TaskType) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id });

    const style_task = {
      transform: transform
        ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
        : undefined,
      transition,
    };
    return (
      <>
        <div
          className={`flex flex-row w-full active:dark:bg-primary-dark3 active:bg-white active:!border-t-0 active:!border-b-0
            border-solid border-b-[0.5px] border-t-[0.5px] border-x-0 
            border-primary-light2 dark:border-primary-dark4 active:drop-shadow-xl z-0
            ${
              index === 0 &&
              "!border-t-0 active:!border-t-[1px] active:!border-b-[1px]"
            } ${
            index === props.data.length - 1 &&
            "!border-b-[1px] active:!border-t-[1px] active:!border-b-[1px]"
          }
          `}
          style={style_task}
        >
          <div className="h-[60px] w-[86px] flex items-center justify-center">
            <div
              onClick={() => props.onChange(id)}
              className={`rotate-45 cursor-pointer flex items-center justify-center h-[24px] w-[24px] rounded-[100px] hover:!border-[#57ddff] 
              ${
                check
                  ? "bg-gradient-to-r from-[#57ddff] to-[#c058f3]"
                  : "border-[2px] border-solid border-primary-light3 dark:border-primary-dark5"
              } 
              `}
            >
              {check && <img src={ICON_CHECK} className="-rotate-45" />}
            </div>
          </div>

          <p
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            className={`dark:text-primary-gray1 mb-[-4px] w-full duration-200 p-[18px_24px_18px_0px] cursor-grab active:cursor-grabbing ${
              check
                ? "line-through text-primary-light3 dark:text-primary-light4"
                : "text-primary-light5"
            }`}
          >
            {title}
          </p>
        </div>
      </>
    );
  };

  return (
    <>
      <SortableContext
        items={props.data}
        strategy={verticalListSortingStrategy}
      >
        {props.data.map((item, index) => (
          <Task
            key={item.id}
            id={item.id}
            title={item.title}
            check={item.check}
            index={index}
          />
        ))}
      </SortableContext>
    </>
  );
};

export default Column;
