import { useContext, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"
import { ToastAlerta } from "../../util/ToastAlerta"

function Perfil() {
    const navigate = useNavigate()
    const { usuario } = useContext(AuthContext)

    useEffect(() => {
        if (usuario.token === "") {
            ToastAlerta("Você precisa estar logado", "info")
            navigate("/")
        }
    }, [usuario.token])

    return (
        <div className="min-h-screen bg-[#020617] text-slate-300 font-mono py-10 px-4">
            
            <div className="container mx-auto max-w-4xl rounded-3xl overflow-hidden bg-slate-900/40 backdrop-blur-xl border border-white/10 shadow-2xl relative">
                
                {/* Imagem de Capa - Nova: Setup Tech Minimalista */}
                <div className="relative h-72">
                    <img
                        className="w-full h-full object-cover opacity-60 mix-blend-luminosity"
                        src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop"
                        alt="Capa do Perfil (Setup Tech)"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                </div>

                {/* Foto de Perfil com Ring de Gradiente */}
                <div className="relative flex justify-center -mt-28 z-20">
                    <div className="p-1.5 bg-gradient-to-tr from-cyan-400 to-purple-500 rounded-full shadow-2xl">
                        <img
                            className="rounded-full w-48 h-48 object-cover border-4 border-[#020617]"
                            src={usuario.foto || "https://i.imgur.com/Ih0Uf9u.png"}
                            alt={`Foto de perfil de ${usuario.nome}`}
                        />
                    </div>
                </div>

                {/* Informações do Usuário */}
                <div className="flex flex-col items-center justify-center p-10 pt-6">
                    <div className="text-center space-y-2 mb-8">
                        <h2 className="text-4xl font-extrabold text-white tracking-tighter">
                            {usuario.nome}
                        </h2>
                        <p className="text-cyan-400 font-bold uppercase tracking-widest text-sm">
                            Usuário:[ID_{usuario.id}]
                        </p>
                        <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-slate-500 to-transparent mx-auto mt-4"></div>
                    </div>

                    <div className="w-full max-w-md space-y-4">
                        {/* Card de Email estilo Terminal */}
                        <div className="bg-black/20 border border-white/5 p-4 rounded-xl flex items-center gap-4">
                            <span className="text-purple-500 font-bold">@</span>
                            <div className="flex flex-col">
                                <span className="text-[10px] uppercase text-slate-500 font-bold tracking-widest">Email :</span>
                                <span className="text-slate-200">{usuario.usuario}</span>
                            </div>
                        </div>

                        {/* Card de Status */}
                        <div className="bg-black/20 border border-white/5 p-4 rounded-xl flex items-center gap-4">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                            </span>
                            <div className="flex flex-col">
                                <span className="text-[10px] uppercase text-slate-500 font-bold tracking-widest">Status</span>
                                <span className="text-slate-200">Active / Session Verified</span>
                            </div>
                        </div>
                    </div>

                    {/* Ações */}
                    <div className="mt-10 flex gap-4 w-full justify-center">
                        <Link to={`/atualizarusuario`} className="group relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-xl blur opacity-25 group-hover:opacity-60 transition duration-300"></div>
                            <button className="relative bg-slate-900 border border-white/10 text-white font-bold px-10 py-3 rounded-xl transition-all duration-300 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-cyan-400">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                </svg>
                                Editar Perfil
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Detalhe estético inferior */}
                <div className="h-2 w-full bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 opacity-30"></div>
            </div>
        </div>
    )
}

export default Perfil