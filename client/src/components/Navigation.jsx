import { Link } from "react-router-dom";

export function Navigation({ searchTerm, onSearch }) {
  const handleSearchChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div className="flex justify-between py-5">
      <Link to="/tasks">
        <h1 className="font-bold text-3xl mb-4">TaskApp</h1>
      </Link>
      <div className="flex items-center ga-3">
        <input
          type="text"
          placeholder="Search Task"
          value={searchTerm}
          onChange={handleSearchChange}
          className="p-2 border rounded"
        />
      </div>
      <button className="bg-indigo-500 px-3 py-3 rounded-lg">
        <Link to="/tasks-create">Create Task</Link>
      </button>
    </div>
  );
}
