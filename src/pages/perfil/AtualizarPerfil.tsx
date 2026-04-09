import { type ChangeEvent, type FormEvent, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ClipLoader } from "react-spinners"
import { AuthContext } from "../../contexts/AuthContext"
import type Usuario from "../../models/Usuario"
import { atualizar, buscar } from "../../services/Service"
import { ToastAlerta } from "../../util/ToastAlerta"

function AtualizarPerfil() {
    
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [user, setUser] = useState<Usuario>({} as Usuario)
    const [confirmarSenha, setConfirmarSenha] = useState<string>("")
    
    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token
    const id: string = usuario.id.toString()

    async function buscarUsuarioPorId() {
        try {
            await buscar(`/usuarios/${id}`, setUser, {
                headers: { Authorization: token },
            })
            setUser((user) => ({ ...user, senha: "" }))
            setConfirmarSenha("")
        } catch (error: any) {
            if (error.toString().includes("401")) {
                handleLogout()
            } else {
                ToastAlerta("Usuário não encontrado!", "erro")
                retornar()
            }
        }
    }

    useEffect(() => {
        if (token === "") {
            ToastAlerta("Você precisa estar logado!", "info")
            navigate("/")
        }
    }, [token])

    useEffect(() => {
        if (id !== undefined) {
            buscarUsuarioPorId()
        }
    }, [id])

    function retornar() {
        navigate("/perfil")
    }

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        })
    }

    function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
        setConfirmarSenha(e.target.value)
    }

    async function atualizarUsuario(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)

        if (confirmarSenha === user.senha && user.senha.length >= 8) {
            try {
                await atualizar(`/usuarios/atualizar`, user, setUser, {
                    headers: { Authorization: token },
                })
                ToastAlerta("Usuário atualizado! Efetue o Login Novamente!", "sucesso")
                handleLogout()
            } catch (error: any) {
                if (error.toString().includes("401")) {
                    handleLogout()
                } else {
                    ToastAlerta("Erro ao atualizar o usuário!", "erro")
                }
            }
        } else {
            ToastAlerta("Dados inconsistentes. Verifique a senha (mínimo 8 caracteres).", "erro")
            setUser({ ...user, senha: "" })
            setConfirmarSenha("")
        }
        setIsLoading(false)
    }

    return (
        <div className="min-h-screen bg-[#020617] text-slate-300 font-mono py-12 px-4 relative overflow-hidden">
            
            {/* Decorativo de fundo */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="container mx-auto max-w-5xl relative z-10">
                <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_2fr]">
                        
                        {/* Seção Lateral (Preview) */}
                        <div className="bg-gradient-to-b from-cyan-600/20 to-slate-900 p-8 flex flex-col items-center justify-center border-r border-white/5">
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                                <img
                                    src={user.foto || "https://i.imgur.com/Ih0Uf9u.png"}
                                    alt={user.nome}
                                    className="relative w-40 h-40 object-cover rounded-full border-2 border-white/20 shadow-2xl"
                                />
                                <div className="absolute bottom-2 right-2 bg-cyan-500 p-2 rounded-full shadow-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-white">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                                    </svg>
                                </div>
                            </div>
                            <h2 className="text-white text-xl font-bold mt-6 tracking-tighter text-center">{user.nome}</h2>
                            <p className="text-cyan-400/60 text-xs mt-1 uppercase tracking-widest">{user.usuario}</p>
                            
                            <div className="mt-8 w-full space-y-2 opacity-50 text-[10px]">
                                <p>// system_log: ready</p>
                                <p>// id: {usuario.id}</p>
                                <p>// status: editing_mode</p>
                            </div>
                        </div>

                        {/* Seção do Formulário */}
                        <div className="p-8 lg:p-12 bg-black/20">
                            <header className="mb-10">
                                <h1 className="text-3xl font-extrabold text-white tracking-tighter">
                                    Informações do Perfil
                                </h1>
                                <p className="text-slate-500 text-sm mt-2 font-mono">Atualize suas credenciais de acesso ao terminal.</p>
                            </header>

                            <form onSubmit={atualizarUsuario} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="nome" className="text-xs text-cyan-400 font-bold uppercase">Nome :</label>
                                        <input
                                            type="text"
                                            id="nome"
                                            name="nome"
                                            placeholder="Nome"
                                            className="bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-cyan-500/50 transition-all shadow-inner"
                                            value={user.nome || ""}
                                            onChange={atualizarEstado}
                                            required
                                        />
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="usuario" className="text-xs text-slate-500 font-bold uppercase">Email :</label>
                                        <input
                                            type="email"
                                            id="usuario"
                                            name="usuario"
                                            className="bg-slate-800/30 border border-white/5 rounded-xl p-3 text-slate-500 cursor-not-allowed italic"
                                            disabled
                                            value={user.usuario || ""}
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label htmlFor="foto" className="text-xs text-cyan-400 font-bold uppercase">Foto de Perfil :</label>
                                    <input
                                        type="url"
                                        id="foto"
                                        name="foto"
                                        placeholder="URL da foto"
                                        className="bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-cyan-500/50 transition-all shadow-inner"
                                        value={user.foto || ""}
                                        onChange={atualizarEstado}
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="senha" className="text-xs text-cyan-400 font-bold uppercase">Nova Senha :</label>
                                        <input
                                            type="password"
                                            id="senha"
                                            name="senha"
                                            placeholder="Mínimo 8 caracteres"
                                            className="bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-cyan-500/50 transition-all shadow-inner"
                                            value={user.senha || ""}
                                            onChange={atualizarEstado}
                                            required
                                            minLength={8}
                                        />
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="confirmarSenha" className="text-xs text-cyan-400 font-bold uppercase">Confirmar Senha :</label>
                                        <input
                                            type="password"
                                            id="confirmarSenha"
                                            name="confirmarSenha"
                                            placeholder="Repita a senha"
                                            className="bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-cyan-500/50 transition-all shadow-inner"
                                            value={confirmarSenha}
                                            onChange={handleConfirmarSenha}
                                            required
                                            minLength={8}
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                                    <button
                                        type="button"
                                        onClick={retornar}
                                        className="flex-1 rounded-xl px-4 py-3 border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-all font-bold uppercase text-sm"
                                    >
                                        Cancelar
                                    </button>

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="flex-1 rounded-xl px-4 py-3 bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500 hover:text-white transition-all duration-300 font-bold uppercase text-sm flex justify-center items-center shadow-lg shadow-cyan-500/10"
                                    >
                                        {isLoading ? (
                                            <ClipLoader color="#22d3ee" size={20} />
                                        ) : (
                                            <span>Atualizar Perfil</span>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AtualizarPerfil