import { useEffect, useState, type ChangeEvent, type SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import type Usuario from "../../models/Usuario";
import { cadastrarUsuario } from "../../services/Service";
import { ToastAlerta } from "../../util/ToastAlerta"; // Importando o utilitário de Toast

function Cadastro() {

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [confirmarSenha, setConfirmarSenha] = useState<string>("");

  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    nome: "",
    usuario: "",
    senha: "",
    foto: ""
  })

  useEffect(() => {
    if (usuario.id !== 0) {
      retornar()
    }
  }, [usuario])

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    })
  }

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
    setConfirmarSenha(e.target.value)
  }

  async function cadastrarNovoUsuario(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    if (confirmarSenha === usuario.senha && usuario.senha.length >= 8) {
      try {
        await cadastrarUsuario('/usuarios/cadastrar', usuario, setUsuario);
        ToastAlerta('Usuário Cadastrado com sucesso!', 'sucesso');
      } catch (error) {
        ToastAlerta('Erro ao cadastrar o usuário!', 'erro');
      }
    } else {
      ToastAlerta('Dados inconsistentes! Verifique as senhas (mínimo 8 caracteres).', 'erro');
      setUsuario({
        ...usuario,
        senha: ''
      });
      setConfirmarSenha('');
    }
    setIsLoading(false)
  }

  function retornar() {
    navigate("/")
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 relative overflow-hidden font-mono">
      
      {/* Background Decorativo sutil (linhas de código opacas) */}
      <div className="absolute inset-0 opacity-[0.02] text-[10px] whitespace-pre overflow-hidden pointer-events-none">
        {`import { createUser } from '@dev/auth';\nconst sys = require('sys-api');\n// initializing handshake...\nfunction init() {\n  return sys.db.connect();\n}\n`.repeat(100)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center relative z-10">
        
        {/* Coluna 1: Nova Imagem Temática Dev */}
        <div className="w-full h-full lg:block hidden relative overflow-hidden border-r border-white/5">
          <img 
            src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1000&auto=format&fit=crop" 
            alt="Código de computador em um monitor" 
            className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-[#020617]/50"></div>
          
          {/* Texto sobreposto na imagem */}
          <div className="absolute bottom-16 left-16 right-16 p-8 bg-slate-900/40 backdrop-blur-sm rounded-2xl border border-white/10">
            <h1 className="text-3xl font-bold text-white tracking-tighter mb-2">
              <span className="text-cyan-400">$ </span>Blog Pessoal()
            </h1>
            <p className="text-slate-400 text-sm">
              // Crie sua identidade digital para acessar o terminal e começar a commitar suas postagens.
            </p>
          </div>
        </div>

        {/* Coluna 2: Formulário Glassmorphism */}
        <div className="flex justify-center items-center w-full h-full p-4">
          <form className='flex flex-col w-full max-w-md gap-5 p-10
                           bg-slate-900/40 backdrop-blur-xl 
                           border border-white/10 rounded-3xl shadow-2xl'
                onSubmit={cadastrarNovoUsuario}
          >
            <div className="text-center mb-4">
              <h2 className='text-white text-5xl font-extrabold tracking-tighter'>Cadastrar Usuário</h2>
              <p className="text-slate-500 text-sm mt-1">// Preencha os parâmetros obrigatórios</p>
            </div>

            {/* Campo Nome */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="nome" className="text-xs text-cyan-400 font-bold uppercase tracking-widest">Nome :</label>
              <input
                type="text"
                id="nome"
                name="nome"
                placeholder="'Seu Nome Completo'"
                required
                className="bg-black/20 border border-white/10 rounded-xl p-3 text-white 
                           focus:outline-none focus:border-cyan-500/50 transition-all placeholder:text-slate-600"
                value={usuario.nome}
                onChange={atualizarEstado}
              />
            </div>

            {/* Campo Usuário (E-mail) */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="usuario" className="text-xs text-cyan-400 font-bold uppercase tracking-widest">Email :</label>
              <input
                type="email"
                id="usuario"
                name="usuario"
                placeholder="'exemplo@email.com'"
                required
                className="bg-black/20 border border-white/10 rounded-xl p-3 text-white 
                           focus:outline-none focus:border-cyan-500/50 transition-all placeholder:text-slate-600"
                value={usuario.usuario}
                onChange={atualizarEstado}
              />
            </div>

            {/* Campo Foto */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="foto" className="text-xs text-cyan-400 font-bold uppercase tracking-widest">Foto :</label>
              <input
                type="text"
                id="foto"
                name="foto"
                placeholder="'http://imagem.com/foto.jpg'"
                className="bg-black/20 border border-white/10 rounded-xl p-3 text-white 
                           focus:outline-none focus:border-cyan-500/50 transition-all placeholder:text-slate-600"
                value={usuario.foto}
                onChange={atualizarEstado}
              />
            </div>

            {/* Campo Senha */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="senha" className="text-xs text-cyan-400 font-bold uppercase tracking-widest">Senha :</label>
              <input
                type="password"
                id="senha"
                name="senha"
                placeholder="'********'"
                required
                className="bg-black/20 border border-white/10 rounded-xl p-3 text-white 
                           focus:outline-none focus:border-cyan-500/50 transition-all placeholder:text-slate-600"
                value={usuario.senha}
                onChange={atualizarEstado}
              />
              <span className="text-[10px] text-slate-600 mt-1">// Mínimo de 8 caracteres</span>
            </div>

            {/* Campo Confirmar Senha */}
            <div className="flex flex-col gap-1.5 mb-2">
              <label htmlFor="confirmarSenha" className="text-xs text-cyan-400 font-bold uppercase tracking-widest">Confirmar Senha :</label>
              <input
                type="password"
                id="confirmarSenha"
                name="confirmarSenha"
                placeholder="'********'"
                required
                className="bg-black/20 border border-white/10 rounded-xl p-3 text-white 
                           focus:outline-none focus:border-cyan-500/50 transition-all placeholder:text-slate-600"
                value={confirmarSenha}
                onChange={handleConfirmarSenha}
              />
            </div>

            {/* Botões */}
            <div className="flex justify-around w-full gap-6 mt-4 pt-4 border-t border-white/5">
              <button
                type='reset'
                className='flex-1 rounded-xl text-slate-400 bg-white/5 border border-white/10 py-3 
                           hover:bg-white/10 transition-all duration-300'
                onClick={retornar}
              >
               Cancelar
              </button>
              <button
                type='submit'
                className='flex-1 rounded-xl text-white bg-cyan-500/20 border border-cyan-500/50 
                           hover:bg-cyan-500 hover:text-white transition-all duration-300
                           flex justify-center items-center shadow-lg shadow-cyan-500/10 py-3'
                disabled={isLoading}
              >
                {isLoading ? (
                  <ClipLoader color="#ffffff" size={22} />
                ) : (
                  <span>Criar</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Cadastro;