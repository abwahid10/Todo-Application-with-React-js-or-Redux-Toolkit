import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { toggleTodo, editTodo, removeTodo } from "./todosSlice";

export default function TodoItem({ todo }) {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);

  const commitEdit = () => {
    const trimmed = draft.trim();
    setIsEditing(false);
    if (trimmed && trimmed !== todo.text) {
      dispatch(editTodo({ id: todo.id, text: trimmed }));
    } else {
      setDraft(todo.text);
    }
  };

  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => dispatch(toggleTodo(todo))}
        aria-label={`Mark "${todo.text}" as ${
          todo.completed ? "active" : "completed"
        }`}
      />

      {isEditing ? (
        <input
          type="text"
          className="edit-input"
          value={draft}
          autoFocus
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commitEdit}
          onKeyDown={(e) => {
            if (e.key === "Enter") commitEdit();
            if (e.key === "Escape") {
              setDraft(todo.text);
              setIsEditing(false);
            }
          }}
        />
      ) : (
        <span className="todo-text" onDoubleClick={() => setIsEditing(true)}>
          {todo.text}
        </span>
      )}

      <button
        type="button"
        className="delete-btn"
        onClick={() => dispatch(removeTodo(todo.id))}
        aria-label={`Delete "${todo.text}"`}
      >
        ×
      </button>
    </li>
  );
}
