# Redux Toolkit Todo App

React + Redux Toolkit todo app, with async CRUD handled through `createAsyncThunk` (thunk middleware is built into `configureStore` by default — no extra setup needed).

## Run it

```bash
npm install
npm run dev
```

Open the printed localhost URL.

## Structure

```
src/
  app/
    store.js          # configureStore setup
    hooks.js           # useAppDispatch / useAppSelector
  features/todos/
    todosAPI.js         # mock "backend" (localStorage + simulated latency)
    todosSlice.js        # slice: state, reducers, thunks, selectors
    AddTodoForm.jsx
    TodoItem.jsx
    TodoList.jsx
    TodoFilters.jsx
  App.jsx
  main.jsx
```

## How the async flow works

Each CRUD action is a `createAsyncThunk`:

```js
export const addTodo = createAsyncThunk("todos/addTodo", async (text) => {
  return await api.createTodo(text);
});
```

`extraReducers` in `todosSlice.js` handles the `pending` / `fulfilled` / `rejected` actions RTK dispatches automatically around that thunk, so `status` and `error` in the store always reflect the latest request.

## Swapping in a real API

Everything routes through `src/features/todos/todosAPI.js`. Replace the bodies of `fetchTodos`, `createTodo`, `updateTodo`, `deleteTodo` with real `fetch`/`axios` calls to your backend — the slice and components don't need to change.

## Features

- Fetch todos on load (loading / error / empty states)
- Add, toggle, inline-edit (double-click text), delete — all async, backed by the mock API
- Filter: all / active / completed, with a remaining-count
- Persisted to `localStorage` so a refresh doesn't lose your data
