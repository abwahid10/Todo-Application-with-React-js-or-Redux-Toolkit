import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import * as api from "./todosAPI";

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  return await api.fetchTodos();
});

export const addTodo = createAsyncThunk("todos/addTodo", async (text) => {
  return await api.createTodo(text);
});

export const toggleTodo = createAsyncThunk(
  "todos/toggleTodo",
  async (todo) => {
    return await api.updateTodo(todo.id, { completed: !todo.completed });
  }
);

export const editTodo = createAsyncThunk(
  "todos/editTodo",
  async ({ id, text }) => {
    return await api.updateTodo(id, { text });
  }
);

export const removeTodo = createAsyncThunk(
  "todos/removeTodo",
  async (id) => {
    await api.deleteTodo(id);
    return id;
  }
);


const initialState = {
  items: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  filter: "all", // 'all' | 'active' | 'completed'
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    filterChanged(state, action) {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchTodos
      .addCase(fetchTodos.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // addTodo
      .addCase(addTodo.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      // toggleTodo (optimistic-ish: just apply server response)
      .addCase(toggleTodo.fulfilled, (state, action) => {
        const todo = state.items.find((t) => t.id === action.payload.id);
        if (todo) todo.completed = action.payload.completed;
      })
      // editTodo
      .addCase(editTodo.fulfilled, (state, action) => {
        const todo = state.items.find((t) => t.id === action.payload.id);
        if (todo) todo.text = action.payload.text;
      })
      // removeTodo
      .addCase(removeTodo.fulfilled, (state, action) => {
        state.items = state.items.filter((t) => t.id !== action.payload);
      });
  },
});

export const { filterChanged } = todosSlice.actions;
export default todosSlice.reducer;

// ---- Selectors ------------------------------------------------------------

export const selectAllTodos = (state) => state.todos.items;
export const selectTodosStatus = (state) => state.todos.status;
export const selectTodosError = (state) => state.todos.error;
export const selectFilter = (state) => state.todos.filter;

export const selectVisibleTodos = createSelector(
  [selectAllTodos, selectFilter],
  (todos, filter) => {
    switch (filter) {
      case "active":
        return todos.filter((t) => !t.completed);
      case "completed":
        return todos.filter((t) => t.completed);
      default:
        return todos;
    }
  }
);

export const selectRemainingCount = createSelector(
  [selectAllTodos],
  (todos) => todos.filter((t) => !t.completed).length
);
