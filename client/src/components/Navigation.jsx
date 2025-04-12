import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export function Navigation({ searchTerm, onSearch }) {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('accessToken'));
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('accessToken'));
  }, [localStorage.getItem('accessToken')]);

  const handleSearchChange = (e) => {
    onSearch(e.target.value);
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
    navigate('/login');
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

      <div>
        {isLoggedIn ? (
          <div>
            <button className="bg-indigo-500 px-3 py-3 rounded-lg">
              <Link to="/tasks-create">Create Task</Link>
            </button>
            <button
              className="bg-indigo-500 px-3 py-3 rounded-lg ml-5"
              onClick={handleLogout}
            >
              Log out
            </button>
          </div>
        ) : (
          <button className="bg-indigo-500 px-3 py-3 rounded-lg">
            <Link to="/login">Log In</Link>
          </button>
        )}
      </div>
    </div>
  );
}
