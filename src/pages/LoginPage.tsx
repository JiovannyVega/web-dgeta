import { useState } from 'react';
import { FaEnvelope, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex min-h-screen w-full">
            {/* Lado izquierdo - Formulario */}
            <div className="flex flex-col justify-center items-center w-full lg:w-1/2 bg-white px-8 py-12">
                <div className="w-full max-w-md">
                    {/* Logo y título */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Bienvenido</h1>
                        <p className="text-gray-500">Inicia sesión en tu cuenta</p>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-4 mb-8 border-b border-gray-200">
                        <button className="pb-3 px-1 border-b-2 border-green-800 text-green-800 font-semibold">
                            Iniciar Sesión
                        </button>
                        <Link to="/register" className="pb-3 px-1 text-gray-500 hover:text-gray-700 transition-colors">
                            Registrarse
                        </Link>
                    </div>

                    {/* Formulario */}
                    <form className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Correo electrónico
                            </label>
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="tu@correo.com"
                                    className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                                />
                                <FaEnvelope className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Contraseña
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center">
                                <input type="checkbox" className="w-4 h-4 text-green-800 border-gray-300 rounded focus:ring-green-500" />
                                <span className="ml-2 text-sm text-gray-600">Recordarme</span>
                            </label>
                            <a href="#" className="text-sm text-green-800 hover:text-green-700 font-medium">
                                ¿Olvidaste tu contraseña?
                            </a>
                        </div>

                        <Link to="/estudiante/dashboard">
                            <button
                                type="button"
                                className="w-full bg-green-800 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold shadow-sm"
                            >
                                Iniciar Sesión
                            </button>
                        </Link>

                        {/* Separador "o" */}
                        <div className="flex items-center gap-4 my-4">
                            <div className="flex-1 border-t border-gray-300"></div>
                            <span className="px-4 text-sm text-gray-500">o</span>
                            <div className="flex-1 border-t border-gray-300"></div>
                        </div>

                        {/* Google Sign In */}
                        <button className="w-full bg-white border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center justify-center gap-2 shadow-sm">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png"
                                alt="Google"
                                className="w-5 h-5"
                            />
                            Continuar con Google
                        </button>
                    </form>
                </div>
            </div>

            {/* Lado derecho - Banner */}
            <div className="hidden lg:flex flex-col justify-center items-center w-1/2 bg-gradient-to-br from-green-700 via-green-800 to-green-900 p-12 relative overflow-hidden">
                {/* Decoración de fondo */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>

                <div className="relative z-10 text-center max-w-lg">
                    <div className="mb-8">
                        <div className="inline-block p-4 bg-white/10 rounded-2xl backdrop-blur-sm mb-6">
                            <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center">
                                <svg className="w-10 h-10 text-green-800" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <h2 className="text-4xl font-bold text-white mb-4">
                        Dirección General de Educación Tecnológica Agropecuaria
                    </h2>
                    <p className="text-lg text-green-100 mb-8">
                        Sistema integral de gestión educativa para estudiantes y profesores
                    </p>

                    <div className="grid grid-cols-3 gap-4 text-white">
                        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                            <div className="text-2xl font-bold">+500</div>
                            <div className="text-sm text-green-100">Estudiantes</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                            <div className="text-2xl font-bold">+50</div>
                            <div className="text-sm text-green-100">Profesores</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                            <div className="text-2xl font-bold">+30</div>
                            <div className="text-sm text-green-100">Grupos</div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default LoginPage;
