import { useState, useContext, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AuthContext } from "../../../contexts/AuthContext"
import type Postagem from "../../../models/Postagem"
import { buscar, deletar } from "../../../services/Service"
import { ClipLoader } from "react-spinners"
import { ToastAlerta } from "../../../util/ToastAlerta"

function DeletarPostagem() {

    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [postagem, setPostagem] = useState<Postagem>({} as Postagem)
    const { id } = useParams<{ id: string }>()
    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    async function buscarPorId(id: string) {
        try {
            await buscar(`/postagens/${id}`, setPostagem, {
                headers: { 'Authorization': token }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado', 'info')
            navigate('/')
        }
    }, [token])

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    async function deletarPostagem() {
        setIsLoading(true)
        try {
            await deletar(`/postagens/${id}`, {
                headers: { 'Authorization': token }
            })
            ToastAlerta('Postagem apagada com sucesso', 'sucesso')
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            } else {
                ToastAlerta('Erro ao deletar a postagem.', 'erro')
            }
        }
        setIsLoading(false)
        retornar()
    }

    function retornar() {
        navigate("/postagens")
    }

    return (
        // FUNDO FIXO: min-h-screen bg-[#020617] para garantir o contraste
        <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center font-mono relative overflow-hidden py-10 px-4">
            
            {/* Efeito de brilho avermelhado para indicar perigo/exclusão */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className='container w-full max-w-lg relative z-10'>
                {/* Cabeçalho de Alerta */}
                <div className="text-center mb-8">
                    <h1 className='text-3xl font-bold text-white mb-2 uppercase tracking-tighter'>
                        Deletar <span className="text-red-500">Postagem</span>
                    </h1>
                    <p className='text-slate-500 text-sm'>
                        // Aviso: Esta ação não pode ser desfeita.
                    </p>
                </div>

                {/* Card Glassmorphism de Confirmação */}
                <div className='bg-slate-900/40 backdrop-blur-xl border border-red-500/20 rounded-3xl overflow-hidden shadow-2xl shadow-red-900/10'>
                    
                    <header className='py-4 px-6 bg-red-500/10 border-b border-red-500/20 text-red-500 font-bold text-lg flex items-center gap-2'>
                        <span className="animate-pulse">⚠️</span> Confirmar Exclusão?
                    </header>

                    <div className="p-6 space-y-4">
                        <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                            <p className='text-cyan-400 text-[10px] uppercase font-bold tracking-widest mb-1'>&gt; Título da Postagem:</p>
                            <p className='text-white text-xl font-bold'>{postagem.titulo}</p>
                        </div>

                        <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                            <p className='text-cyan-400 text-[10px] uppercase font-bold tracking-widest mb-1'>&gt; Prévia do Conteúdo:</p>
                            <p className='text-slate-400 text-sm italic line-clamp-3'>
                                "{postagem.texto}"
                            </p>
                        </div>
                    </div>

                    {/* Botões de Ação */}
                    <div className="flex flex-col sm:flex-row p-4 gap-4 border-t border-white/5 bg-black/20">
                        <button
                            className='flex-1 py-3 px-4 rounded-xl text-sm font-bold text-slate-300 border border-white/10 hover:bg-white/5 transition-all'
                            onClick={retornar}>
                            Cancelar
                        </button>
                        
                        <button
                            className='flex-1 py-3 px-4 rounded-xl text-sm font-bold text-white bg-red-500/20 border border-red-500/50 hover:bg-red-500 transition-all flex items-center justify-center shadow-lg shadow-red-500/20'
                            onClick={deletarPostagem}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <ClipLoader color="#ffffff" size={20} />
                            ) : (
                                <span>Deletar Agora</span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeletarPostagem