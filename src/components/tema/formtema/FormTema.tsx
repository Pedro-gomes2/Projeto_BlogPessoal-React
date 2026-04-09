import { useState, useContext, useEffect, type ChangeEvent, type SyntheticEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import type Tema from "../../../models/Tema";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { ClipLoader } from "react-spinners";
import { ToastAlerta } from "../../../util/ToastAlerta";

function FormTema() {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [tema, setTema] = useState<Tema>({ id: 0, descricao: '', postagem: [] });
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

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setTema({
            ...tema,
            [e.target.name]: e.target.value
        })
    }

    async function gerarNovoTema(e: SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);

        if (id !== undefined) {
            try {
                await atualizar('/temas', tema, setTema, {
                    headers: { Authorization: token }
                });
                ToastAlerta('Tema atualizado com sucesso!', 'sucesso')
            } catch (error: any) {
                if (error.toString().includes('401')) {
                    handleLogout();
                } else {
                    ToastAlerta('Erro ao Atualizar o Tema!', 'erro');
                }
            }
        } else {
            try {
                await cadastrar('/temas', tema, setTema, {
                    headers: { Authorization: token }
                });
                ToastAlerta('Tema cadastrado com sucesso!', 'sucesso')
            } catch (error: any) {
                if (error.toString().includes('401')) {
                    handleLogout();
                } else {
                    ToastAlerta('Erro ao Cadastrar o Tema!', 'erro');
                }
            }
        }

        setIsLoading(false);
        retornar();
    }

    function retornar() {
        navigate('/temas');
    }

    return (
        /* min-h-screen e bg-[#020617] garantem o azul profundo da sua 'estante' em toda a tela */
        <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center py-12 px-4 transition-colors duration-500">
            
            {/* Cabeçalho de Terminal */}
            <div className="text-center mb-12 font-mono">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="h-[1px] w-8 bg-purple-500/50 shadow-[0_0_8px_#a855f7]"></div>
                    <span className="text-purple-400 text-xs tracking-[0.3em] uppercase">Sistema_Módulo</span>
                    <div className="h-[1px] w-8 bg-purple-500/50 shadow-[0_0_8px_#a855f7]"></div>
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter">
                    <span className="text-purple-500">./</span>{id === undefined ? "Novo Tema" : "Editar Tema"}
                </h1>
                <p className="text-slate-500 mt-3 text-sm italic font-light">
                    // Editando banco de dados de categorias...
                </p>
            </div>

            {/* Container Glassmorphism com o fundo levemente mais claro que o principal para dar profundidade */}
            <form 
                className="w-full max-w-2xl flex flex-col gap-8 p-10 md:p-14
                           bg-white/[0.03] backdrop-blur-2xl
                           border border-white/10 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden"
                onSubmit={gerarNovoTema}
            >
                {/* Linha de brilho no topo do card */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent"></div>

                <div className="flex flex-col gap-4">
                    <label htmlFor="descricao" className="font-mono text-xs text-slate-400 font-bold flex items-center gap-2 uppercase tracking-[0.2em]">
                        <span className="text-purple-500">{"{ "}</span> 
                        descrição_do_tema 
                        <span className="text-purple-500">{" }"}</span>
                    </label>
                    
                    <div className="relative group">
                        <input
                            type="text"
                            placeholder="Ex: React, Java, TypeScript..."
                            name='descricao'
                            required
                            className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 text-white 
                                       focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 
                                       transition-all font-mono text-lg
                                       placeholder:text-slate-700"
                            value={tema.descricao}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-5 mt-4">
                    <button
                        type="button"
                        onClick={retornar}
                        className="flex-1 rounded-2xl font-mono text-xs font-bold text-slate-400 
                                   bg-white/5 border border-white/10 py-5 hover:bg-white/10 
                                   hover:text-white transition-all uppercase tracking-widest"
                    >
                        cancelar()
                    </button>

                    <button
                        className="flex-[2] rounded-2xl font-mono text-xs font-bold text-white 
                                   bg-purple-600/20 border border-purple-500/50 
                                   hover:bg-purple-600 hover:shadow-[0_0_25px_rgba(168,85,247,0.4)] 
                                   transition-all duration-300
                                   flex justify-center items-center uppercase tracking-widest"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <ClipLoader color="#ffffff" size={18} />
                        ) : (
                            <span>{id === undefined ? "Salvar" : "Atualizar"}</span>
                        )}
                    </button>
                </div>
            </form>

            {/* Barra de Status Inferior */}
            <div className="mt-8 flex items-center gap-6 font-mono text-[10px] text-slate-600 uppercase tracking-[0.2em]">
                <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e] animate-pulse"></span>
                    <span>Link_Status: Online</span>
                </div>
                <div className="hidden sm:block">
                    <span>Env: Production</span>
                </div>
            </div>
        </div>
    );
}

export default FormTema;