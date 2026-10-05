import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { filterChanged, selectFilter, selectRemainingCount } from "./todosSlice";

const FILTERS = ["all", "active", "completed"];

export default function TodoFilters() {
  const dispatch = useAppDispatch();
  const filter = useAppSelector(selectFilter);
  const remaining = useAppSelector(selectRemainingCount);

  return (
    <div className="filters">
      <span className="remaining-count">
        {remaining} item{remaining === 1 ? "" : "s"} left
      </span>
      <div className="filter-buttons">
        {FILTERS.map((f) => (
          <button
            key={f}
            className={f === filter ? "active" : ""}
            onClick={() => dispatch(filterChanged(f))}
          >
            {f[0].toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}
