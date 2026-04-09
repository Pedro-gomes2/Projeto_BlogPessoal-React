import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import CardPostagem from "../cardpostagem/CardPostagem";
import type Postagem from "../../../models/Postagem";
import { AuthContext } from "../../../contexts/AuthContext";
import { ToastAlerta } from "../../../util/ToastAlerta";
import { buscar } from "../../../services/Service";

function ListaPostagens() {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [postagens, setPostagens] = useState<Postagem[]>([])
    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado!', "info")
            navigate('/')
        }
    }, [token])

    useEffect(() => {
        buscarPostagens()    
    }, [postagens.length])

    async function buscarPostagens() {
        try {
            setIsLoading(true)
            await buscar('/postagens', setPostagens, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        // Adicionamos o fundo Dark e a fonte mono para combinar com a Home
        <div className="min-h-screen bg-[#020617] flex flex-col items-center font-mono relative overflow-hidden">
            
            {/* Orbes de luz decorativas no fundo */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none"></div>

            {/* Overlay de Loading com Glassmorfismo */}
            {isLoading && (
                <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/40 backdrop-blur-md">
                    <div className="bg-slate-900/60 p-10 rounded-3xl border border-cyan-500/20 flex flex-col items-center gap-4 shadow-[0_0_50px_-12px_rgba(34,211,238,0.3)]">
                        <SyncLoader
                            color="#22d3ee" 
                            size={15}
                        />
                        <span className="text-cyan-400 text-sm tracking-widest animate-pulse">
                            READING_DATABASE...
                        </span>
                    </div>
                </div>
            )}

            <div className="container flex flex-col py-12 px-4 relative z-10">
                
                {/* Cabeçalho da Lista */}
                <div className="mb-12 border-l-4 border-cyan-500 pl-6">
                    <h2 className="text-3xl font-extrabold text-white uppercase tracking-tighter flex items-center gap-3">
                        <span className="text-cyan-500 opacity-50">#</span>
                        feed_postagens
                    </h2>
                    <p className="text-slate-500 text-sm mt-1">// Analisando transmissões recentes na rede...</p>
                </div>

                {/* Mensagem de Lista Vazia Estilo Terminal */}
                {(!isLoading && postagens.length === 0) && (
                    <div className="mx-auto mt-20 p-16 bg-slate-900/20 border border-dashed border-slate-700 rounded-[2rem] text-center max-w-lg">
                        <div className="text-red-400 font-bold mb-4 text-4xl">!</div>
                        <span className="text-xl font-bold text-slate-300 block mb-2">
                            EMPTY_REPOSITORY
                        </span>
                        <p className="text-slate-500 text-sm leading-relaxed">
                            Nenhuma postagem encontrada no servidor. <br />
                            Tente inicializar um novo conteúdo.
                        </p>
                    </div>
                )}

                {/* Grid de Postagens */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {postagens.map((postagem) => (
                        <div key={postagem.id} className="transform hover:-translate-y-2 transition-transform duration-300">
                             <CardPostagem postagem={postagem}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default ListaPostagens;