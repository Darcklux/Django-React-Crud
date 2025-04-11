import { useEffect, useState } from "react";
import { getAllTasks } from "../api/tasks.api";
import { TaskCard } from "./TaskCard";

export function TasksList({ searchTerm }) {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    async function loadTasks() {
      const accesToken = localStorage.getItem("accessToken");
      if (!accesToken) return;
      try {
        const res = await getAllTasks(accesToken);
        setTasks(res);
        setFilteredTasks(res);
      } catch (error) {
        console.log("Error fetching tasks:", error);
      }
    }
    loadTasks();
  }, []);

  useEffect(() => {
    if (Array.isArray(tasks)) {
      const filtered = tasks.filter((task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredTasks(filtered);
    }
  }, [searchTerm, tasks]);

  return (
    <div className="grid grid-cols-3 gap-3">
      {Array.isArray(filteredTasks) &&
        filteredTasks.map((task) => <TaskCard key={task.id} task={task} />)}
    </div>
  );
}
