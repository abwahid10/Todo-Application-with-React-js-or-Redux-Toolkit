const STORAGE_KEY = "rtk-todos";
const LATENCY_MS = 400;

function readStore() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) return JSON.parse(raw);
  const seed = [
    { id: crypto.randomUUID(), text: "Set up the Redux store", completed: true },
    { id: crypto.randomUUID(), text: "Write the todos slice", completed: true },
    { id: crypto.randomUUID(), text: "Wire up async thunks", completed: false },
  ];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
  return seed;
}

function writeStore(todos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchTodos() {
  await delay(LATENCY_MS);
  return readStore();
}

export async function createTodo(text) {
  await delay(LATENCY_MS);
  const todos = readStore();
  const todo = { id: crypto.randomUUID(), text, completed: false };
  writeStore([...todos, todo]);
  return todo;
}

export async function updateTodo(id, changes) {
  await delay(LATENCY_MS);
  const todos = readStore();
  const index = todos.findIndex((t) => t.id === id);
  if (index === -1) throw new Error("Todo not found");
  const updated = { ...todos[index], ...changes };
  const next = [...todos];
  next[index] = updated;
  writeStore(next);
  return updated;
}

export async function deleteTodo(id) {
  await delay(LATENCY_MS);
  const todos = readStore();
  writeStore(todos.filter((t) => t.id !== id));
  return id;
}
