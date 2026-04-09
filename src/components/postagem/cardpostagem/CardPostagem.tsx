import { Link } from "react-router-dom"
import type Postagem from "../../../models/Postagem"

interface CardPostagensProps {
    postagem: Postagem
}

function CardPostagem({ postagem }: CardPostagensProps) {
    return (
        <div className='flex flex-col rounded-2xl overflow-hidden justify-between 
                        bg-slate-900/40 backdrop-blur-md 
                        border border-white/10 shadow-xl 
                        transition-all duration-300 hover:scale-[1.02] hover:border-cyan-500/30'>
                
            <div>
                {/* Header do Card - Estilo "Terminal Header" */}
                <div className="flex w-full bg-white/5 py-3 px-4 items-center gap-4 border-b border-white/10">
                    <img
                        src={postagem.usuario?.foto}
                        className='h-10 w-10 rounded-full border-2 border-cyan-500/50 object-cover'
                        alt={postagem.usuario?.nome} />
                    <div className="flex flex-col">
                        <h3 className='text-sm font-mono font-bold text-white leading-none'>
                            {postagem.usuario?.nome}
                        </h3>
                        <span className="text-[10px] font-mono text-cyan-400">status: online</span>
                    </div>
                </div>

                {/* Conteúdo - Estilo Code Snippet */}
                <div className='p-6 font-mono'>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-pink-500 text-xs font-bold">Título:</span>
                        <h4 className='text-lg font-bold text-slate-100 uppercase tracking-tight'>
                            {postagem.titulo}
                        </h4>
                    </div>
                    
                    <p className="text-slate-300 text-sm mb-4 leading-relaxed bg-black/20 p-3 rounded-lg border border-white/5">
                        {postagem.texto}
                    </p>
                    
                    <div className="space-y-1">
                        <p className="text-xs text-slate-400">
                            <span className="text-cyan-400">tema:</span> "{postagem.tema?.descricao}"
                        </p>
                        <p className="text-[10px] text-slate-500 italic">
                            /* {new Intl.DateTimeFormat("pt-BR", {
                                dateStyle: 'full',
                                timeStyle: 'short',
                            }).format(new Date(postagem.data))} */
                        </p>
                    </div>
                </div>
            </div>

            {/* Ações - Botões Estilizados */}
            <div className="flex border-t border-white/10">
                <Link to={`/editarpostagem/${postagem.id}`} 
                    className='w-full text-cyan-400 py-3 flex items-center justify-center 
                               hover:bg-cyan-500/10 transition-all font-mono text-xs font-bold border-r border-white/10'>
                    Editar Postagem
                </Link>
                <Link to={`/deletarpostagem/${postagem.id}`} 
                    className='w-full text-red-400 py-3 flex items-center justify-center 
                               hover:bg-red-500/10 transition-all font-mono text-xs font-bold'>
                    Deletar Postagem
                </Link>
            </div>
        </div>
    )
}

export default CardPostagem