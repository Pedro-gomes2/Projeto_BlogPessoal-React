import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import type Tema from "../../../models/Tema";
import type Postagem from "../../../models/Postagem";
import { AuthContext } from "../../../contexts/AuthContext";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { ToastAlerta } from "../../../util/ToastAlerta";

function FormPostagem() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [temas, setTemas] = useState<Tema[]>([])
    const [tema, setTema] = useState<Tema>({ id: 0, descricao: '', postagem: [] })
    const [postagem, setPostagem] = useState<Postagem>({} as Postagem)
    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token
    const { id } = useParams<{ id: string }>()

    async function buscarPostagemPorId(id: string) {
        try {
            await buscar(`/postagens/${id}`, setPostagem, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        }
    }

    async function buscarTemaPorId(id: string) {
        try {
            await buscar(`/temas/${id}`, setTema, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        }
    }

    async function buscarTemas() {
        try {
            await buscar('/temas', setTemas, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado', "info");
            navigate('/');
        }
    }, [token])

    useEffect(() => {
        buscarTemas()
        if (id !== undefined) {
            buscarPostagemPorId(id)
        }
    }, [id])

    useEffect(() => {
        setPostagem({
            ...postagem,
            tema: tema,
        })
    }, [tema])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setPostagem({
            ...postagem,
            [e.target.name]: e.target.value,
            tema: tema,
            usuario: usuario,
        });
    }

    function retornar() {
        navigate('/postagens');
    }

    async function gerarNovaPostagem(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)

        if (id !== undefined) {
            try {
                await atualizar(`/postagens`, postagem, setPostagem, {
                    headers: { Authorization: token },
                });
                ToastAlerta('Postagem atualizada com sucesso', "sucesso")
            } catch (error: any) {
                if (error.toString().includes('401')) {
                    handleLogout()
                } else {
                    ToastAlerta('Erro ao atualizar a Postagem', "erro")
                }
            }
        } else {
            try {
                await cadastrar(`/postagens`, postagem, setPostagem, {
                    headers: { Authorization: token },
                })
                ToastAlerta('Postagem cadastrada com sucesso', "sucesso");
            } catch (error: any) {
                if (error.toString().includes('401')) {
                    handleLogout()
                } else {
                    ToastAlerta('Erro ao cadastrar a Postagem', "erro");
                }
            }
        }
        setIsLoading(false)
        retornar()
    }

    const carregandoTema = tema.descricao === '';

    return (
        <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center font-mono relative overflow-hidden py-10">
            
            {/* Efeitos de iluminação de fundo */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="container flex flex-col items-center relative z-10 px-4">
                
                {/* Cabeçalho */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-white tracking-tighter flex items-center justify-center gap-3">
                        <span className="text-cyan-400 font-bold">{">"}</span>
                        {id !== undefined ? 'Atualizar Postagem()' : 'Nova Postagem'}
                    </h1>
                    <p className="text-slate-500 mt-2">// Pronto para enviar as alterações para o sistema</p>
                </div>

                {/* Card do Formulário */}
                <form 
                    className="flex flex-col w-full max-w-2xl gap-6 p-8
                               bg-slate-900/40 backdrop-blur-xl
                               border border-white/10 rounded-3xl shadow-2xl"
                    onSubmit={gerarNovaPostagem}
                >
                    {/* Campo: Título */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="titulo" className="text-xs text-pink-500 font-bold uppercase tracking-widest">
                            Título da Postagem
                        </label>
                        <input
                            type="text"
                            placeholder="Digite o título aqui..."
                            name="titulo"
                            required
                            className="bg-black/40 border border-white/10 rounded-xl p-3 text-white 
                                       focus:outline-none focus:border-cyan-500 transition-all shadow-inner"
                            value={postagem.titulo}
                            onChange={atualizarEstado}
                        />
                    </div>

                    {/* Campo: Conteúdo */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="texto" className="text-xs text-pink-500 font-bold uppercase tracking-widest">
                            Conteúdo da Postagem
                        </label>
                        <textarea
                            placeholder="Escreva sua postagem..."
                            name="texto"
                            required
                            rows={6}
                            className="bg-black/40 border border-white/10 rounded-xl p-3 text-white 
                                       focus:outline-none focus:border-cyan-500 transition-all shadow-inner resize-none"
                            value={postagem.texto}
                            onChange={atualizarEstado}
                        />
                    </div>

                    {/* Campo: Tema */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="tema" className="text-xs text-cyan-400 font-bold uppercase tracking-widest">
                            Selecionar Tema
                        </label>
                        <div className="relative">
                            <select 
                                name="tema" 
                                id="tema" 
                                className='w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white 
                                           focus:outline-none focus:border-cyan-500 transition-all appearance-none cursor-pointer' 
                                onChange={(e) => buscarTemaPorId(e.currentTarget.value)}
                                value={tema.id || ""}
                                required
                            >
                                <option value="" disabled>-- escolha_um_tema --</option>
                                {temas.map((tema) => (
                                    <option key={tema.id} value={tema.id} className="bg-slate-900">
                                        {tema.descricao}
                                    </option>
                                ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-cyan-500">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                            </div>
                        </div>
                    </div>

                    {/* Botões */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <button 
                            type="button"
                            onClick={retornar}
                            className="flex-1 rounded-xl py-3 border border-red-500/30 text-red-400 
                                       hover:bg-red-500/10 transition-all font-bold text-sm uppercase"
                        >
                            Cancelar
                        </button>

                        <button 
                            type='submit' 
                            disabled={carregandoTema || isLoading}
                            className='flex-1 rounded-xl py-3 bg-cyan-500/20 border border-cyan-500/50 
                                       text-cyan-400 hover:bg-cyan-500 hover:text-white transition-all 
                                       duration-300 font-bold text-sm uppercase flex justify-center items-center shadow-lg shadow-cyan-500/10'
                        >
                            { isLoading ? 
                                <ClipLoader color="#22d3ee" size={20} /> : 
                                <span>{id === undefined ? 'Publicar Agora' : 'Confirmar Edição'}</span>
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default FormPostagem;