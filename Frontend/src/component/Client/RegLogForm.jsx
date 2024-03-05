import React from "react";
import { useForm } from "react-hook-form";
import contact from "../../assets/imgs/register.webp";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const loginSchema = yup.object({
  username: yup.string().required("El usuario es requerido"),
  password: yup
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .required("La contraseña es requerida"),
});

const registerSchema = loginSchema.shape({
  email: yup.string().email("Email inválido").required("El email es requerido"),
  company: yup.string().required("La empresa es requerida"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Las contraseñas deben coincidir")
    .required("La confirmación de contraseña es requerida"),
});

export default function RegLogForm({ loginUser, registerUser }) {
  const [registro, setRegistro] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registro ? registerSchema : loginSchema),
  });
  const onSubmit = (data) => {
    if (registro) {
      if (data.password !== data.confirmPassword) {
        return;
      }
      const { confirmPassword, ...registerData } = data;

      registerUser(registerData);
    } else {
      loginUser(data);
    }
  };

  const divStyle = {
    backgroundImage: `url(${contact})`,
    backgroundSize: "100%",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "100%",
  };

  const handleSwitchMode = () => {
    setRegistro(!registro);
  };

  return (
    <>
      <section className="text-white font-sans mt-6" style={divStyle}>
        <div className="min-h-screen flex items-center justify-center">
          <div className="p-8 rounded-lg w-full md:w-1/2 lg:w-1/3 backdrop-blur-md shadow-2xl">
            <h2 className="text-3xl text-white font-semibold mb-6 text-center text:shadow-lg">
              {registro ? "Registro" : "Inicio de Sesión"}
            </h2>
            <form
              className="w-full max-w-sm mx-auto"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex items-center justify-center mt-20">
                <div
                  onClick={() => setRegistro(false)}
                  className={`w-1/3 pb-4 font-medium text-center ${
                    !registro
                      ? "text-gray-300 capitalize border-b-2 border-gray-500 dark:border-white-900 dark:text-white"
                      : "text-white-500"
                  } cursor-pointer`}
                >
                  Entrar
                </div>

                <div
                  onClick={() => setRegistro(true)}
                  className={`w-1/3 pb-4 font-medium text-center ${
                    registro
                      ? "text-gray-300 capitalize border-b-2 border-gray-500 dark:border-gray-400 dark:text-white"
                      : "text-white-500"
                  } cursor-pointer`}
                >
                  Registro
                </div>
              </div>

              {registro ? (
                // Campos específicos para registro
                <>
                  <div className="relative flex items-center mt-8">
                    <span className="absolute">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 mx-3 text-gray-600 dark:text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </span>
                    <input
                      id="username"
                      {...register("username", {
                        required: "El usuario es requerido",
                      })}
                      className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      placeholder="Usuario"
                    />
                  </div>
                  {errors.username && (
                    <p style={{ color: "red" }}>{errors.username.message}</p>
                  )}

                  <div className="relative flex items-center mt-8">
                    <span className="absolute">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 mx-3 text-gray-600 dark:text-gray-500"
                        fill="currentColor"
                        viewBox="0 0 32 32"
                      >
                        <rect x="8" y="8" width="2" height="4" />
                        <rect x="8" y="14" width="2" height="4" />
                        <rect x="14" y="8" width="2" height="4" />
                        <rect x="14" y="14" width="2" height="4" />
                        <rect x="8" y="20" width="2" height="4" />
                        <rect x="14" y="20" width="2" height="4" />
                        <path d="M30,14a2,2,0,0,0-2-2H22V4a2,2,0,0,0-2-2H4A2,2,0,0,0,2,4V30H30ZM4,4H20V28H4ZM22,28V14h6V28Z" />
                      </svg>
                    </span>
                    <input
                      id="company"
                      {...register("company", {
                        required: "La empresa es requerida",
                      })}
                      className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      placeholder="Empresa"
                    />
                  </div>
                  {errors.company && (
                    <p style={{ color: "red" }}>{errors.company.message}</p>
                  )}

                  <div className="relative flex items-center mt-8">
                    <span className="absolute">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-100" // Cambiado el color a text-gray-300
                      >
                        <path
                          d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12C22 15.7712 22 17.6569 20.8284 18.8284C19.6569 20 17.7712 20 14 20H10C6.22876 20 4.34315 20 3.17157 18.8284C2 17.6569 2 15.7712 2 12Z"
                          stroke="#1C274C"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M6 8L8.1589 9.79908C9.99553 11.3296 10.9139 12.0949 12 12.0949C13.0861 12.0949 14.0045 11.3296 15.8411 9.79908L18 8"
                          stroke="#1C274C"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>

                    <input
                      type="email"
                      id="email"
                      {...register("email", {
                        required: "El email es requerido",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Email inválido",
                        },
                      })}
                      className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      placeholder="Dirección de Email"
                    />
                  </div>
                  {errors.email && (
                    <p style={{ color: "red" }}>{errors.email.message}</p>
                  )}

                  <div className="relative flex items-center mt-4">
                    <span className="absolute">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 mx-3 text-gray-600 dark:text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </span>
                    <input
                      type="password"
                      id="password"
                      {...register("password", {
                        required: "La contraseña es requerida",
                      })}
                      className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      placeholder="Contraseña"
                    />
                  </div>
                  {errors.password && (
                    <p style={{ color: "red" }}>{errors.password.message}</p>
                  )}

                  <div className="relative flex items-center mt-4">
                    <span className="absolute">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 mx-3 text-gray-600 dark:text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </span>
                    <input
                      type="password"
                      id="confirmPassword"
                      {...register("confirmPassword", {
                        required: "La confirmación de contraseña es requerida",
                      })}
                      className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      placeholder="Confirmar Contraseña"
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p style={{ color: "red" }}>
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </>
              ) : (
                // Campos específicos para inicio de sesión
                <>
                  <div className="relative flex items-center mt-8">
                    <span className="absolute">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </span>
                    <input
                      id="username"
                      {...register("username", {
                        required: "El usuario es requerido",
                      })}
                      className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      placeholder="Usuario"
                    />
                  </div>
                  {errors.username && (
                    <p style={{ color: "red" }}>{errors.username.message}</p>
                  )}

                  <div className="relative flex items-center mt-4">
                    <span className="absolute">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </span>
                    <input
                      type="password"
                      id="password"
                      {...register("password", {
                        required: "La contraseña es requerida",
                      })}
                      className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-gray-400 dark:focus:border-gray-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      placeholder="Contraseña"
                    />
                  </div>
                  {errors.password && (
                    <p style={{ color: "red" }}>{errors.password.message}</p>
                  )}
                </>
              )}

              <div className="mt-6">
                {
                  <button
                    type="submit"
                    className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-500 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                  >
                    {registro ? "Registrarse" : "Iniciar Sesión"}
                  </button>
                }

                <div className="mt-6 text-center ">
                  <span
                    onClick={handleSwitchMode}
                    className="text-sm text-white-100 hover:underline dark:text-white-400 cursor-pointer"
                  >
                    {registro
                      ? "¿Ya tienes una cuenta? Inicia Sesión"
                      : "¿No tienes una cuenta? Regístrate"}
                  </span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
