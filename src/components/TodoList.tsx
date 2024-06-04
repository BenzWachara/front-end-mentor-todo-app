import { useState, useEffect } from "react";
import {
  DndContext,
  closestCorners,
  DragEndEvent,
  UniqueIdentifier,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import ICON_SUN from "../assets/icon-sun.svg";
import ICON_MOON from "../assets/icon-moon.svg";
import Column from "./Column";

const mock_data_todo_list = [
  {
    id: "00",
    title: "Complete online Javascript course",
    check: true,
  },
  {
    id: "11",
    title: "Jog around the park 3x",
    check: false,
  },
  {
    id: "22",
    title: "10 minutes meditation",
    check: false,
  },
  {
    id: "33",
    title: "Read for 1 hour",
    check: false,
  },
  {
    id: "44",
    title: "Pick up groceries",
    check: false,
  },
  {
    id: "55",
    title: "Complete Todo App on Frontend Mentor",
    check: false,
  },
];

export type TodoListType = {
  id: string;
  title: string;
  check: boolean;
};

const getTheme = () => {
  return localStorage.getItem("@key:theme");
};

const TodoList = () => {
  const [theme, setTheme] = useState(getTheme() || "light");
  const [new_todo, setNewTodo] = useState<string>("");
  const [todo_list_data, setTodoListData] =
    useState<TodoListType[]>(mock_data_todo_list);
  const [filter, setFilter] = useState<string>("all");

  const toggleCheck = (id: string) => {
    setTodoListData((prevTodoListData) =>
      prevTodoListData.map((todo) =>
        todo.id === id ? { ...todo, check: !todo.check } : todo
      )
    );
  };

  const getTaskPos = (id: UniqueIdentifier) =>
    todo_list_data.findIndex((task) => task.id === id);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id === over?.id) return;
    if (!over) return;

    setTodoListData((todo_list_data) => {
      const original_pos = getTaskPos(active.id);
      const new_pos = getTaskPos(over?.id);

      return arrayMove(todo_list_data, original_pos, new_pos);
    });
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleToggleTheme = () => {
    const new_theme = theme === "dark" ? "light" : "dark";
    setTheme(new_theme);
    localStorage.setItem("@key:theme", new_theme);
    window.toggleTheme();
  };

  const filtered_todo_list = todo_list_data.filter((todo) => {
    if (filter === "all") return true;
    if (filter === "active") return !todo.check;
    if (filter === "completed") return todo.check;
  });

  const item_left = todo_list_data.filter((todo) => !todo.check);

  const clearCompleted = () => {
    setTodoListData((prevTodoListData) =>
      prevTodoListData.filter((todo) => !todo.check)
    );
  };

  const addTodo = () => {
    if (new_todo.trim() === "") {
      return;
    }

    const new_id = self.crypto.randomUUID().toString();
    const new_todo_item: TodoListType = {
      id: new_id,
      title: new_todo,
      check: false,
    };

    setTodoListData([...todo_list_data, new_todo_item]);
    setNewTodo("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <h1
          className="text-white text-[34px] tracking-[12px]"
          onClick={() => console.log(todo_list_data)}
        >
          TODO
        </h1>
        {theme === "light" ? (
          <img
            className="h-[28px] w-[28px] cursor-pointer select-none"
            src={ICON_SUN}
            onClick={() => handleToggleTheme()}
          />
        ) : (
          <img
            className="h-[28px] w-[28px] cursor-pointer select-none"
            src={ICON_MOON}
            onClick={() => handleToggleTheme()}
          />
        )}
      </div>
      <div className="flex flex-row items-center p-[18px_24px] rounded-[5px] w-full mt-[50px] gap-[24px] bg-white dark:bg-primary-dark3 duration-200">
        <div
          onClick={() => addTodo()}
          className="h-[24px] w-[24px] border-[2px] outline-none border-solid rounded-[100px] cursor-pointer border-primary-light3 dark:border-primary-dark5 duration-200"
        ></div>

        <input
          className="m-0 p-0 mb-[-4px] w-[calc(100%-60px)] !border-0 outline-none active:outline-none focus:outline-none focus:!ring-0 text-primary-light5 bg-white dark:text-primary-gray1 dark:bg-primary-dark3 duration-200"
          placeholder="Create a new todo..."
          type="text"
          value={new_todo}
          onKeyDown={handleKeyDown}
          onChange={(e) => setNewTodo(e.target.value)}
        />
      </div>

      <div className="flex flex-col rounded-[5px] w-full mt-[24px] min-h-[412px] justify-between bg-white dark:bg-primary-dark3 duration-200">
        <div>
          <DndContext
            onDragEnd={handleDragEnd}
            collisionDetection={closestCorners}
          >
            <Column
              data={filtered_todo_list}
              onChange={(id) => toggleCheck(id)}
            />
          </DndContext>
        </div>

        <div className="flex flex-row p-[14px_24px] w-full justify-between text-[12px] select-none">
          <p className="dark:text-primary-dark5">
            {item_left.length} item left
          </p>
          <div className="flex flex-row gap-[18px] xs:hidden">
            <p
              className={`cursor-pointer dark:text-primary-dark5 dark:hover:text-white hover:text-primary-light5 
              ${filter == "all" && "!text-[var(--color-primary-blue)]"}`}
              onClick={() => setFilter("all")}
            >
              All
            </p>
            <p
              className={`cursor-pointer dark:text-primary-dark5 dark:hover:text-white hover:text-primary-light5
              ${filter == "active" && "!text-[var(--color-primary-blue)]"}`}
              onClick={() => setFilter("active")}
            >
              Active
            </p>
            <p
              className={`cursor-pointer dark:text-primary-dark5 dark:hover:text-white hover:text-primary-light5
              ${filter == "completed" && "!text-[var(--color-primary-blue)]"}`}
              onClick={() => setFilter("completed")}
            >
              Completed
            </p>
          </div>
          <p
            className={`cursor-pointer dark:text-primary-dark5 dark:hover:text-white hover:text-primary-light5`}
            onClick={clearCompleted}
          >
            Clear Completed
          </p>
        </div>
      </div>

      <div className="flex-row items-center flex-wrap justify-center text-[16px] p-[18px_24px] rounded-[5px] w-full mt-[24px] gap-[18px] bg-white dark:bg-primary-dark3 duration-200 hidden xs:flex">
        <p
          className={`cursor-pointer dark:text-primary-dark5 dark:hover:text-white hover:text-primary-light5 
              ${filter == "all" && "!text-[var(--color-primary-blue)]"}`}
          onClick={() => setFilter("all")}
        >
          All
        </p>
        <p
          className={`cursor-pointer dark:text-primary-dark5 dark:hover:text-white hover:text-primary-light5
              ${filter == "active" && "!text-[var(--color-primary-blue)]"}`}
          onClick={() => setFilter("active")}
        >
          Active
        </p>
        <p
          className={`cursor-pointer dark:text-primary-dark5 dark:hover:text-white hover:text-primary-light5
              ${filter == "completed" && "!text-[var(--color-primary-blue)]"}`}
          onClick={() => setFilter("completed")}
        >
          Completed
        </p>
      </div>
    </>
  );
};

export default TodoList;
