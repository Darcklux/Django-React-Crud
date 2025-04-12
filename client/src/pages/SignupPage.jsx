import { useForm } from 'react-hook-form';
import { signupUser } from '../api/auth.api';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const { register, handleSubmit, formState: errors } = useForm();
  const navigate = useNavigate();
  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    try {
      console.log(data);
      await signupUser(data);
      navigate('/login');
    } catch (error) {
      console.log('Error durante la creacion de usuario');
    }
  });

  return (
    <div className="max-w-sm mx-auto pt-15">
      <form onSubmit={onSubmit}>
        <input
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-5"
          type="text"
          placeholder="Nombre de usuario"
          {...register('username', { required: true })}
        />
        {errors.username && <span>Este campo es requerido</span>}

        <input
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-5"
          type="email"
          placeholder="Email"
          {...register('email', { required: true })}
        />
        {errors.email && <span>Este campo es requerido</span>}

        <input
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-5"
          type="password"
          placeholder="Contraseña"
          {...register('password', { required: true })}
        />
        {errors.password && <span>Este campo es requerido</span>}
        <button className="bg-indigo-500 p-3 rounded-lg block w-full mt-3">
          Sign up
        </button>
      </form>
    </div>
  );
};
export default SignupPage;
