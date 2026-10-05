import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { addTodo } from "./todosSlice";

 function AddTodoForm() {
  const dispatch = useAppDispatch();
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const canSubmit = text.trim().length > 0 && !submitting;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    try {
      await dispatch(addTodo(text.trim())).unwrap();
      setText("");
    } catch (err) {
      console.error("Failed to add todo:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What needs doing?"
        aria-label="New todo text"
      />
      <button type="submit" disabled={!canSubmit}>
        {submitting ? "Adding…" : "Add"}
      </button>
    </form>
  );
}

export default AddTodoForm