import { useContext, useEffect, useState, type ChangeEvent, type SyntheticEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import type UsuarioLogin from "../../models/UsuarioLogin";
import { AuthContext } from "../../contexts/AuthContext";
import { ClipLoader } from "react-spinners";

function Login() {

    const navigate = useNavigate();
    const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>({} as UsuarioLogin);
    const { usuario, handleLogin, isLoading } = useContext(AuthContext);

    useEffect(() => {
        if (usuario.token !== "") {
            navigate("/home")
        }
    }, [usuario])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUsuarioLogin({
            ...usuarioLogin,
            [e.target.name]: e.target.value
        })
    }

    function login(e: SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();
        handleLogin(usuarioLogin);
    }

    return (
        <div className="min-h-screen bg-[#020617] text-slate-300 relative overflow-hidden font-mono">
            
            {/* Background Decorativo sutil */}
            <div className="absolute inset-0 opacity-[0.015] text-[10px] whitespace-pre overflow-hidden pointer-events-none">
                {`import { auth } from '@dev/core';\n// initialising security protocols...\nconst login = (u, p) => sys.auth(u, p);\n`.repeat(100)}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center relative z-10">
                
                {/* Coluna 1: Formulário Glassmorphism */}
                <div className="flex justify-center items-center w-full h-full p-4">
                    <form className='flex flex-col w-full max-w-md gap-6 p-10
                                     bg-slate-900/40 backdrop-blur-xl 
                                     border border-white/10 rounded-3xl shadow-2xl'
                          onSubmit={login}
                    >
                        <div className="text-center mb-4">
                            <h2 className='text-white text-5xl font-extrabold tracking-tighter'>Login</h2>
                            <p className="text-slate-500 text-sm mt-1">// Identifique-se para continuar</p>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="usuario" className="text-xs text-cyan-400 font-bold uppercase tracking-widest">Email :</label>
                            <input
                                type="email"
                                id="usuario"
                                name="usuario"
                                placeholder="'usuario@email.com'"
                                required
                                className="bg-black/20 border border-white/10 rounded-xl p-4 text-white 
                                           focus:outline-none focus:border-cyan-500/50 transition-all placeholder:text-slate-600"
                                value={usuarioLogin.usuario || ''}
                                onChange={atualizarEstado}
                            />
                        </div>

                        <div className="flex flex-col gap-1.5 mb-2">
                            <label htmlFor="senha" className="text-xs text-cyan-400 font-bold uppercase tracking-widest">Senha :</label>
                            <input
                                type="password"
                                id="senha"
                                name="senha"
                                placeholder="'********'"
                                required
                                className="bg-black/20 border border-white/10 rounded-xl p-4 text-white 
                                           focus:outline-none focus:border-cyan-500/50 transition-all placeholder:text-slate-600"
                                value={usuarioLogin.senha || ''}
                                onChange={atualizarEstado}
                            />
                        </div>

                        <button
                            type='submit'
                            className='rounded-xl text-white bg-cyan-500/20 border border-cyan-500/50 
                                       hover:bg-cyan-500 hover:text-white transition-all duration-300
                                       flex justify-center items-center shadow-lg shadow-cyan-500/10 py-3.5 font-bold'
                        >
                            {isLoading ? (
                                <ClipLoader color="#ffffff" size={24} />
                            ) : (
                                <span>Entrar</span>
                            )}
                        </button>

                        <div className="flex items-center gap-3 my-2 text-slate-800">
                            <div className="h-[1px] flex-1 bg-current"></div>
                            <span className="text-xs font-mono">OR</span>
                            <div className="h-[1px] flex-1 bg-current"></div>
                        </div>

                        <p className="text-center text-sm text-slate-500">
                            Novo por aqui?{' '}
                            <Link to="/cadastro" className="text-cyan-400 hover:text-cyan-300 hover:underline transition-colors font-bold">
                               Cadastre-se
                            </Link>
                        </p>
                    </form>
                </div>

                {/* Coluna 2: Imagem Temática Nova */}
                <div className="w-full h-full lg:block hidden relative overflow-hidden border-l border-white/5">
                    <img 
                        // Nova Imagem: Fibra óptica e dados em alta resolução
                        src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop" 
                        alt="Background Tech" 
                        className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-luminosity hover:scale-105 transition-transform duration-1000 ease-out"
                    />
                    
                    {/* Efeitos de Vinheta e Degradê */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-transparent to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-[#020617]/40"></div>
                    
                    {/* Card Informativo Flutuante */}
                    <div className="absolute bottom-16 left-16 right-16 p-8 bg-slate-900/60 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                            <h1 className="text-2xl font-bold text-white tracking-tighter uppercase">
                                system.access_portal
                            </h1>
                        </div>
                        <p className="text-slate-400 text-xs leading-relaxed font-mono">
                            // Handshake encryption: AES-256 <br />
                            // Connection: SECURE_SSL <br />
                            // Status: WAITING_FOR_CREDENTIALS
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;