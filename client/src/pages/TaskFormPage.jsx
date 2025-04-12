import { useForm } from "react-hook-form";
import { createTask, deleteTask, updateTask, getTask } from "../api/tasks.api";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

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
    console.log(data);
    
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return;
    if (params.id) {
      await updateTask(params.id, data, accessToken);
      toast.success("Task updated successfully!", {
        style: {
          position: "bottom-right",
          background: "#101010",
          color: "#fff",
        },
      });
    } else {
      await createTask(data, accessToken);
      toast.success("Task created successfully!", {
        style: {
          position: "bottom-right",
          background: "#101010",
          color: "#fff",
        },
      });
    }
    navigate("/tasks");
  });

  useEffect(() => {
    const loadTask = async () => {
      try {
        if (params.id) {
          const accessToken = localStorage.getItem("accessToken");
          if (!accessToken) return;
          const res = await getTask(params.id, accessToken);
          console.log(res,"TAREA CARGADA");
          setValue("title", res.title);
          setValue("description", res.description);
          setValue("done", res.done);
        }
      } catch (error) {}
    };
    loadTask();
  }, []);

  return (
    <div className="max-w-xl mx-auto mt-10">
      <form onSubmit={onSubmit}>
        <input
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
          type="text"
          placeholder="Title"
          {...register("title", { required: true })}
        />
        {errors.title && <span>This field is required</span>}
        <textarea
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
          rows="3"
          placeholder="Description"
          {...register("description", {
            required: true,
          })}
        ></textarea>
        {errors.description && <span>This Field is requiered</span>}
        <label className="inline-flex items-center mt-3">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-indigo-600"
            {...register("done")}
          />
          <span className="ml-2 text-white">Completed</span>
        </label>
        <button className="bg-indigo-500 p-3 rounded-lg block w-full mt-3">
          Save
        </button>
      </form>

      {params.id && (
        <div className="flex justify-end">
          <button
            className="bg-red-500 p-3 rounded-lg  w-48 mt-3"
            onClick={async () => {
              const response = window.confirm(
                "Are you sure you want to delete this task?"
              );
              if (response) {
                const accessToken = localStorage.getItem("accessToken");
                if (!accessToken) return;
                await deleteTask(params.id, accessToken);
                toast.success("Task deleted successfully!", {
                  style: {
                    position: "bottom-right",
                    background: "#101010",
                    color: "#fff",
                  },
                });
                navigate("/tasks");
              }
            }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
