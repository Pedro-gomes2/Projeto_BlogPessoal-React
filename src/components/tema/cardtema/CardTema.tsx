import { Link } from 'react-router-dom'
import { PencilLine, Trash, FolderSimple } from '@phosphor-icons/react'
import type Tema from '../../../models/Tema'

interface CardTemaProps {
    tema: Tema
}

function CardTema({ tema }: CardTemaProps) {
    return (
        <div className='flex flex-col rounded-[2.5rem] overflow-hidden justify-between 
                        bg-[#020617]/60 backdrop-blur-xl 
                        border border-white/10 shadow-2xl 
                        transition-all duration-500 hover:border-purple-500/50 group 
                        relative hover:-translate-y-2'>
            
            {/* Efeito de Brilho Interno (Glow) no Hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Cabeçalho - Estilo Aba de Terminal (Inspirado no Navbar) */}
            <header className='py-4 px-8 bg-white/5 border-b border-white/10 
                               text-slate-500 font-mono text-[10px] uppercase tracking-[0.3em] 
                               flex items-center justify-between relative z-10'>
                <div className="flex items-center gap-2">
                    <FolderSimple size={18} className="text-purple-500 group-hover:text-purple-400 transition-colors" />
                    <span>sistema/temas/ativo</span>
                </div>
                <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-800 group-hover:bg-purple-600 transition-colors"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-800 group-hover:bg-cyan-600 transition-colors"></div>
                </div>
            </header>

            {/* Conteúdo Centralizado (Foco na Descrição) */}
            <div className='p-12 flex flex-col items-center justify-center bg-transparent relative z-10'>
                <div className="mb-6 p-6 rounded-3xl bg-black/40 border border-purple-500/20 group-hover:border-purple-500/50 group-hover:scale-105 transition-all duration-500 shadow-inner">
                    <p className='text-3xl font-mono font-black text-white text-center tracking-tight'>
                        <span className="text-purple-500 opacity-70">#</span>{tema.descricao}
                    </p>
                </div>
                
                {/* Tag de ID com Ponto de Status Ativo (Cyan) */}
                <div className="flex items-center gap-3 px-4 py-1.5 rounded-full bg-slate-950/80 border border-white/5 shadow-lg">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                        id referência: {tema.id}
                    </span>
                </div>
            </div>
            
            {/* Botões de Ação - Comandos do Sistema */}
            <div className="flex border-t border-white/10 relative z-10">
                <Link to={`/editartema/${tema.id}`} 
                    className='w-full text-slate-400 bg-white/5 hover:bg-purple-500/20 
                               hover:text-purple-300 flex items-center justify-center gap-3 py-5
                               transition-all font-mono text-xs border-r border-white/10 group/btn'>
                    <PencilLine size={18} className="text-slate-500 group-hover/btn:text-purple-400 transition-colors" />
                    Editar Tema
                </Link>

                <Link to={`/deletartema/${tema.id}`} 
                    className='w-full text-slate-400 bg-white/5 hover:bg-red-500/20 
                               hover:text-red-400 flex items-center justify-center gap-3 py-5
                               transition-all font-mono text-xs group/btn'>
                    <Trash size={18} className="text-slate-500 group-hover/btn:text-red-500 transition-colors" />
                    Deletar Tema
                </Link>
            </div>

            {/* Linha de Decoração Final (Glow) */}
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
        </div>
    )
}

export default CardTema