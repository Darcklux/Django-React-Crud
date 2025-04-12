import React, { useState } from 'react';
import { loginUser, getCurrentUser } from '../api/auth.api';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const LoginPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    console.log('Datos del formulario:', data);
    try {
      const { access } = await loginUser(data.username, data.password);
      console.log('Token de acceso recibido:', access);

      localStorage.setItem('accessToken', access);


      navigate('/tasks');
    } catch (err) {
      console.error('Error durante el login o al obtener usuario:', err);
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
          type="password"
          placeholder="Contraseña"
          {...register('password', { required: true })}
        />
        {errors.password && <span>Este campo es requerido</span>}
        <button className="bg-indigo-500 p-3 rounded-lg block w-full mt-3">
          Iniciar sesión
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
