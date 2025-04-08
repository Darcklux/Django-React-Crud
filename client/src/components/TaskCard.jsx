import { useNavigate } from "react-router-dom";

export function TaskCard({ task }) {
  const navigate = useNavigate();
  return (
    <div
      style={{ background: "black" }}
      onClick={() => {
        navigate(`/tasks/${task.id}`);
        console.log(task);
        
      }}
    >
      <h1>{task.title}</h1>
      <h3>{task.description}</h3>
      <h3>{task.done ? "Completed" : "Not Completed"}</h3>
      <hr />
    </div>
  );
}
