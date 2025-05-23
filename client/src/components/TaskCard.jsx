import { useNavigate } from "react-router-dom";

export function TaskCard({ task }) {
  const navigate = useNavigate();
  return (
    <div
      className="bg-zinc-800 p-3 hover:bg-zinc-700 cursor-pointer"
      onClick={() => {
        navigate(`/tasks/${task.id}`);
        console.log(task);
      }}
    >
      <h1 className="font-bold uppercase">{task.title}</h1>
      <p className="text-slate-400">{task.description}</p>
      <p className="text-slate-300">{task.done ? "Completed" : "Not Completed"}</p>
    </div>
  );
}
