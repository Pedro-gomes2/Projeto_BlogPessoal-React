import { useNavigate } from "react-router-dom";
import CardTema from "../cardtema/CardTema"
import { useContext, useEffect, useState } from "react";
import type Tema from "../../../models/Tema";
import { AuthContext } from "../../../contexts/AuthContext";
import { buscar } from "../../../services/Service";
import { SyncLoader } from "react-spinners";
import { ToastAlerta } from "../../../util/ToastAlerta";

function ListaTemas() {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [temas, setTemas] = useState<Tema[]>([]);
    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado!', 'info');
            navigate('/')
        }
    }, [token])

    useEffect(() => {
        buscarTemas();
    }, [temas.length])

    async function buscarTemas() {
        try {
            setIsLoading(true);
            await buscar('/temas', setTemas, {
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

    return (
        /* Abaixo aplicamos o fundo exato da imagem: 
           bg-[#020617] é o azul 'estante' profundo.
        */
        <div className="min-h-screen bg-[#020617] flex flex-col items-center">
            
            {/* Loader customizado para não quebrar a imersão */}
            {isLoading && (
                <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#020617]/80 backdrop-blur-sm">
                    <SyncLoader
                        color="#a855f7" // Roxo Neon
                        size={15}
                    />
                    <span className="font-mono text-purple-400 text-xs mt-4 animate-pulse uppercase tracking-widest">
                        Carregando_Módulos...
                    </span>
                </div>
            )}

            <div className="container flex flex-col py-12 px-6">
                
                {/* Cabeçalho da Seção */}
                <div className="mb-12 font-mono">
                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter">
                        ./listar Temas<span className="text-purple-500 animate-pulse">_</span>
                    </h2>
                    <div className="h-1 w-20 bg-purple-600 mt-2 rounded-full shadow-[0_0_10px_#a855f7]"></div>
                </div>

                {/* Estado Vazio estilizado */}
                {(!isLoading && temas.length === 0) && (
                    <div className="mx-auto mt-20 p-12 bg-white/5 border border-dashed border-white/10 rounded-[3rem] text-center">
                        <p className="text-slate-400 font-mono">
                            [!] Nenhum tema mapeado no sistema.
                        </p>
                    </div>
                )}

                {/* Grid de Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {temas.map((tema) => (
                        <CardTema key={tema.id} tema={tema} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ListaTemas;