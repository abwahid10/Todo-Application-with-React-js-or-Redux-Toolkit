import AddTodoForm from "./features/todos/AddTodoForm";
import TodoList from "./features/todos/TodoList";
import TodoFilters from "./features/todos/TodoFilters";
import "./index.css";

export default function App() {

  return (
    <main className="page-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="grid-overlay" />

      <section className="app">
        <header className="hero">
          <div className="hero-top">
            <span className="eyebrow">REDUX TOOLKIT</span>
          </div>

          <div className="hero-copy">
            <h1>TODO  <span>Application.</span></h1>
          </div>

        </header>

        <section className="todo-card">
          <div className="card-glow" />
          <div className="card-heading">
            <div>
              <span className="section-label">MY TASKS</span>
              <h2>Today's focus</h2>
            </div>
            {/* <div className="live-pill"><i /> LIVE</div> */}
          </div>

          <AddTodoForm />
          <TodoFilters />
          <TodoList />
        </section>

      </section>
    </main>
  );
}
