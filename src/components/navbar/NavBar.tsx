import { useContext, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext";
import { ToastAlerta } from "../../util/ToastAlerta";
import { SignOut, User, Hash, Notebook, PlusSquare } from "@phosphor-icons/react";

function Navbar() {
    const navigate = useNavigate();
    const { usuario, handleLogout } = useContext(AuthContext);

    function logout() {
        handleLogout();
        ToastAlerta('O Usuário foi desconectado com sucesso!', "info");
        navigate('/');
    }

    let component: ReactNode

    if (usuario.token !== "") {
        component = (
            <nav className="fixed top-0 z-50 w-full flex justify-center py-4 px-6">
                
                {/* Glassmorphism Container com Borda Animada */}
                <div className="container flex justify-between items-center px-6 py-2.5 
                                bg-slate-950/60 backdrop-blur-xl 
                                border border-white/10 rounded-2xl 
                                shadow-[0_8px_32px_0_rgba(0,0,0,0.8)] relative overflow-hidden">
                    
                    {/* Detalhe de luz superior sutil */}
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>

                    {/* Logo */}
                    <Link to="/home" className="flex items-center gap-2 group">
                        <div className="bg-cyan-500/10 p-1.5 rounded-lg border border-cyan-500/20 group-hover:border-cyan-500/50 transition-all">
                            <Hash size={20} className="text-cyan-400" />
                        </div>
                        <span className="text-xl font-mono font-extrabold tracking-tighter text-white">
                            Blog<span className="text-cyan-400">.Dev</span>
                        </span>
                    </Link>

                    {/* Menu Central - Links com Ícones */}
                    <div className="hidden md:flex items-center gap-8 font-mono text-xs font-bold uppercase tracking-widest">
                        <Link to='/postagens' className='flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-all duration-300'>
                            <Notebook size={18} weight="light" />
                            <span>postagens</span>
                        </Link> 
                        <Link to='/temas' className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-all duration-300">
                            <Hash size={18} weight="light" />
                            <span>temas</span>
                        </Link> 
                        <Link to='/cadastrartema' className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-all duration-300">
                            <PlusSquare size={18} weight="light" />
                            <span>novo_tema</span>
                        </Link>
                    </div>

                    {/* Lado Direito: Perfil + Logout */}
                    <div className="flex items-center gap-4 border-l border-white/10 pl-6">
                        <Link to='/perfil' className="flex items-center gap-3 group">
                            <div className="text-right hidden sm:block">
                                <p className="text-[10px] text-slate-500 font-bold leading-none uppercase">Developer</p>
                                <p className="text-xs text-slate-200 font-mono leading-tight">{usuario.nome.split(' ')[0]}</p>
                            </div>
                            <div className="relative">
                                <img 
                                    src={usuario.foto || "https://i.imgur.com/Ih0Uf9u.png"} 
                                    alt="User" 
                                    className="w-9 h-9 rounded-lg object-cover border border-white/20 group-hover:border-cyan-500/50 transition-all"
                                />
                                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-slate-950 rounded-full"></div>
                            </div>
                        </Link>

                        <button 
                            onClick={logout} 
                            className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 
                                     text-red-400 hover:bg-red-500 hover:text-white 
                                     transition-all duration-300 group shadow-lg shadow-red-500/5"
                            title="Sair do Sistema"
                        >
                            <SignOut size={20} weight="bold" />
                        </button>
                    </div>
                </div>
            </nav>
        )
    }

    return (
        <>
            {component}
            {usuario.token !== "" && <div className="h-24"></div>}
        </>
    )
}

export default Navbar