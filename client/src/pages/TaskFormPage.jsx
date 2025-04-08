import { set, useForm } from "react-hook-form";
import { createTask, deleteTask, updateTask, getTask } from "../api/tasks.api";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

export function TaskFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const navigate = useNavigate();
  const params = useParams();

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      await updateTask(params.id, data);
    } else {
      console.log(data);
      await createTask(data);
    }
    navigate("/tasks");
  });

  useEffect(() => {
    const loadTask = async () => {
      if (params.id) {
        const res = await getTask(params.id);
        console.log(res);
        setValue("title", res.data.title);
        setValue("description", res.data.description);
      }
    };
    loadTask();
  }, []);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Title"
          {...register("title", { required: true })}
        />
        {errors.title && <span>This field is required</span>}
        <textarea
          rows="3"
          placeholder="Description"
          {...register("description", {
            required: true,
          })}
        ></textarea>
        {errors.description && <span>This Field is requiered</span>}
        <button>Save</button>
      </form>

      {params.id && (
        <button
          onClick={async () => {
            const response = window.confirm(
              "Are you sure you want to delete this task?"
            );
            if (response) {
              await deleteTask(params.id);
              navigate("/tasks");
            }
          }}
        >
          Delete
        </button>
      )}
    </div>
  );
}
