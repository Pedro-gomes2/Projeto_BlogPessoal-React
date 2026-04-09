import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import type Tema from "../../../models/Tema";
import { buscar, deletar } from "../../../services/Service";
import { ClipLoader } from "react-spinners";
import { ToastAlerta } from "../../../util/ToastAlerta";

function DeletarTema() {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [tema, setTema] = useState<Tema>({} as Tema);
    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;
    const { id } = useParams<{ id: string }>();

    async function buscarTemaPorId() {
        try {
            setIsLoading(true);
            await buscar(`/temas/${id}`, setTema, {
                headers: { Authorization: token }
            });
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout();
            }
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado!', 'info');
            navigate('/')
        }
    }, [token])

    useEffect(() => {
        if (id !== undefined) {
            buscarTemaPorId();
        }
    }, [id])

    function retornar() {
        navigate('/temas');
    }

    async function deletarTema() {
        setIsLoading(true);
        try {
            await deletar(`/temas/${id}`, {
                headers: { Authorization: token }
            });
            ToastAlerta('Tema deletado com sucesso!', 'sucesso')
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout();
            } else {
                ToastAlerta('Erro ao deletar o tema.', 'erro')
            }
        }
        setIsLoading(false);
        retornar()
    }

    return (
        /* Alterado para bg-[#020617] e min-h-screen para casar com o site */
        <div className='min-h-screen flex items-center justify-center p-4 bg-[#020617]'>
            <div className='container w-full max-w-lg mx-auto'>
                
                {/* Header de Comando Estilo Terminal */}
                <div className="text-center mb-10 font-mono">
                    <div className="inline-block px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 mb-4">
                        <span className="text-red-500 text-xs font-bold animate-pulse uppercase tracking-[0.2em]">
                            atencao operação crítica
                        </span>
                    </div>
                    <h1 className='text-4xl font-black text-white uppercase tracking-tighter'>
                        Excluir<span className="text-red-500"> Tema</span>
                    </h1>
                    <p className='text-slate-500 text-sm mt-3 italic'>
                        // Esta ação não pode ser desfeita no banco de dados.
                    </p>
                </div>

                {/* Card Glassmorphism */}
                <div className='bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl relative'>
                    
                    {/* Glow de Alerta Vermelho */}
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-500/50 to-transparent"></div>
                    
                    <header className='py-6 px-8 bg-white/5 border-b border-white/10 text-slate-400 font-mono text-[10px] uppercase tracking-[0.3em] flex items-center justify-between'>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span>
                            <span>confirmacao exclusao</span>
                        </div>
                        <span className="opacity-40 font-bold tracking-normal">id: {id}</span>
                    </header>

                    <div className="p-10 space-y-8">
                        <div className="bg-black/40 p-8 rounded-[2rem] border border-red-500/10 text-center group transition-all hover:border-red-500/30 shadow-inner">
                            <p className="text-[10px] font-mono text-white uppercase tracking-widest mb-4">Conteúdo do Objeto</p>
                            <p className='text-3xl font-mono font-black text-white tracking-tight'>
                                <span className="text-red-500 opacity-50">#</span>{tema.descricao}
                            </p>
                        </div>
                    </div>

                    {/* Footer de Ações */}
                    <div className="flex p-6 gap-4 bg-black/20 border-t border-white/5">
                        <button
                            className='flex-1 py-4 px-6 rounded-2xl font-mono text-xs font-bold text-slate-400 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white transition-all uppercase tracking-widest'
                            onClick={retornar}
                        >
                            cancelar()
                        </button>
                        
                        <button
                            className='flex-1 py-4 px-6 rounded-2xl font-mono text-xs font-bold text-white bg-red-600/20 border border-red-500/50 hover:bg-red-600 hover:shadow-[0_0_25px_rgba(239,68,68,0.4)] transition-all flex items-center justify-center uppercase tracking-widest'
                            onClick={deletarTema}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <ClipLoader color="#ffffff" size={16} />
                            ) : (
                                <span>Confirma Exclusão</span>
                            )}
                        </button>
                    </div>
                </div>
                
                {/* Rodapé decorativo estilo terminal */}
                <div className="mt-8 flex flex-col items-center gap-2 opacity-30 font-mono text-[10px] text-slate-500 uppercase tracking-widest">
                    <div className="flex items-center gap-4">
                        <span>DB_STATUS: CONNECTED</span>
                        <span>|</span>
                        <span>TABLE: TB_TEMAS</span>
                    </div>
                    <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-slate-500 to-transparent"></div>
                </div>
            </div>
        </div>
    )
}

export default DeletarTema;