import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  fetchTodos,
  selectVisibleTodos,
  selectTodosStatus,
  selectTodosError,
} from "./todosSlice";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(selectVisibleTodos);
  const status = useAppSelector(selectTodosStatus);
  const error = useAppSelector(selectTodosError);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTodos());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <p className="status-message">Loading todos…</p>;
  }

  if (status === "failed") {
    return <p className="status-message error">Couldn't load todos: {error}</p>;
  }

  if (todos.length === 0) {
    return <p className="status-message">Nothing here yet.</p>;
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}
