import "./App.css";
import TodoList from "./components/TodoList";

function App() {
  return (
    <>
      <div className="w-full bg-cover bg-center bg-no-repeat h-[304px] bg-[url('./assets/bg-desktop-dark.jpg')] absolute z-0"></div>
      <div className="w-full min-h-[100dvh] flex flex-col items-center px-[24px] z-20 bg-primary-light1 dark:bg-primary-dark2 duration-200">
        <div className="w-full flex flex-col max-w-[546px] z-20 mt-[74px] mb-[50px]">
          <TodoList />
        </div>
        <p className="mb-[50px] text-[14px] text-center">
          Drag and drop to reorder. Challenge by{" "}
          <a
            className="text-[var(--color-primary-purple)]"
            href="https://www.frontendmentor.io/profile/BenzWachara"
            target="_blank"
          >
            Frontend Mentor.
          </a>{" "}
          .
          <br />
          Coded by{" "}
          <a
            className="text-[var(--color-primary-purple)]"
            href="https://www.instagram.com/wachara.workspace/"
            target="_blank"
          >
            Watcharapol
          </a>{" "}
          |{" "}
          <a
            className="text-[var(--color-primary-purple)]"
            href="https://github.com/BenzWachara/frontend-mentor-faqs-accordion"
            target="_blank"
          >
            GitHub
          </a>
        </p>
      </div>
    </>
  );
}

export default App;
