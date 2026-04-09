import ListaPostagens from "../../components/postagem/listapostagens/ListaPostagens"
import ModalPostagem from "../../components/postagem/modalpostagem/ModalPostagem"

function Home() {
    return (
        <div className="min-h-screen bg-[#020617] text-slate-300 font-mono">
            {/* Seção Hero - Estilo Terminal Glass */}
            <div className="relative overflow-hidden bg-slate-950 py-24 border-b border-white/5">
                
                {/* Elementos decorativos de fundo (Luzes Difusas) */}
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none"></div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        
                        {/* Coluna Esquerda: Texto e Call to Action */}
                        <div className="flex flex-col gap-6 text-center md:text-left items-center md:items-start">
                            {/* Badge de Status */}
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-2">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                                </span>
                                Status do Sistema : online
                            </div>
                            
                            <h2 className="text-5xl md:text-7xl font-extrabold text-white tracking-tighter leading-none">
                                Bem <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Vindo!</span>
                            </h2>
                            
                            <p className="text-lg md:text-xl text-slate-400 font-mono leading-relaxed max-w-lg">
                                // Expresse suas ideias, compartilhe códigos e conecte-se com a comunidade dev.
                            </p>

                            {/* Ações */}
                            <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-6">
                                <ModalPostagem />
                               
                            </div>
                        </div>

                        {/* Coluna Direita: NOVA Imagem Temática com Efeito Glass */}
                        <div className="flex justify-center relative group">
                            {/* Brilho de fundo no hover */}
                            <div className="absolute -inset-4 bg-gradient-to-tr from-cyan-500/15 to-purple-500/15 rounded-3xl blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
                            
                            {/* Container da Imagem com borda de vidro */}
                            <div className="relative p-2 bg-slate-900/40 backdrop-blur-sm rounded-3xl border border-white/10 shadow-2xl transform group-hover:scale-[1.02] transition-transform duration-500 ease-out">
                                <img
                                    // NOVA IMAGEM: Ilustração 3D de Dev com interfaces de vidro
                                    src="https://ik.imagekit.io/adb7vrzkj/projeto2/Gemini_Generated_Image_8z69jb8z69jb8z69.png"
                                    alt="Ilustração 3D de um desenvolvedor interagindo com interfaces de vidro flutuantes"
                                    className="relative w-full max-w-md h-auto rounded-2xl mix-blend-lighten"
                                />
                                
                                {/* Linha decorativa de código flutuante */}
                                <div className="absolute top-10 -left-10 bg-slate-800/80 backdrop-blur-md border border-white/10 p-3 rounded-lg font-mono text-[10px] text-cyan-400 shadow-xl hidden lg:block">
                                    &lt;div class="glass-container" /&gt;
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Seção inferior com o Feed de Postagens */}
            <div className="container mx-auto py-16 px-6">
                {/* Cabeçalho do Feed */}
                <div className="flex items-center gap-4 mb-10">
                    <h3 className="text-xl font-mono font-bold text-white tracking-widest uppercase flex items-center gap-2">
                        <span className="text-purple-500">#</span> feed.log
                    </h3>
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent"></div>
                </div>
                
                {/* Componente que lista as postagens */}
                <ListaPostagens />
            </div>
        </div>
    )
}

export default Home