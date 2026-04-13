import React, { use, useContext, type ReactNode } from 'react';
import { GithubLogo, InstagramLogo, LinkedinLogo } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

function Footer() {
  let data = new Date().getFullYear();

<<<<<<< HEAD
  return (
    // Removido o roxo sólido. Agora usa o fundo escuro do site com padding.
    <footer className="w-full bg-[#020410] border-t border-white/5 py-12 font-mono">
      <div className="container mx-auto flex flex-col items-center">
        
        {/* Card Estilo Glass (Igual aos seus cards de postagem) */}
        <div className="bg-slate-900/40 backdrop-blur-md border border-white/10 p-8 rounded-[2rem] flex flex-col items-center w-full max-w-2xl shadow-2xl">
          
          <p className="text-xl font-bold text-white mb-2 tracking-tighter">
            <span className="text-cyan-400 font-normal">//</span> Blog Pessoal | Copyright: <span className="text-purple-400">{data}</span>
          </p>
          
          <p className="text-[10px] uppercase tracking-[0.4em] text-slate-500 mb-8">
            Acessem as Minhas redes sociais
          </p>
          
          {/* Ícones com hover neon */}
          <div className="flex space-x-8">
            <Link 
              to="https://www.linkedin.com/in/joão-pedro-oliveira-95b003255/" 
              target="_blank"
              className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all duration-300 group"
            >
              <LinkedinLogo size={32} weight="thin" className="text-white group-hover:text-cyan-400" />
            </Link>

            <Link 
              to="https://www.instagram.com/gomes.pedro2/" 
              target="_blank"
              className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-pink-500/50 hover:bg-pink-500/10 transition-all duration-300 group"
            >
              <InstagramLogo size={32} weight="thin" className="text-white group-hover:text-pink-400" />
            </Link>

            <Link 
              to="https://github.com/Pedro-gomes2" 
              target="_blank"
              className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-white/40 hover:bg-white/5 transition-all duration-300 group"
            >
              <GithubLogo size={32} weight="thin" className="text-white group-hover:text-slate-300" />
            </Link>
          </div>
          
          {/* Barra de progresso decorativa igual a da Home */}
          <div className="mt-8 w-full max-w-xs h-[1px] bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
          
        </div>

        {/* Mensagem de finalização fora do card */}
        <p className="mt-8 text-[9px] text-slate-700 uppercase tracking-[0.8em] opacity-50">
          -- Fim da Transmissão --
        </p>
      </div>
    </footer>
  );
=======
  const { usuario } = useContext(AuthContext);

  let component: ReactNode

  if (usuario.token !== "") {

    component = (

      <footer className="bg-[#2D2A8E] text-white py-8">
        <div className="container mx-auto flex flex-col items-center">
          <p className="text-lg font-semibold mb-4">
            Blog Pessoal | Copyright: {data}
          </p>
          <p className="text-sm mb-6">Acesse minhas redes sociais</p>

          <div className="flex space-x-6">
            <Link to="https://www.linkedin.com/in/joão-pedro-oliveira-95b003255/" target="_blank">
              <LinkedinLogo size={32} weight="thin" className="hover:text-purple-400 cursor-pointer transition" />
            </Link>
            <Link to="https://www.instagram.com/gomes.pedro2/" target="_blank">
              <InstagramLogo href='https://www.instagram.com/gomes.pedro2/' size={32} weight="thin" className="hover:text-purple-400 cursor-pointer transition" />
            </Link>
            <Link to="https://github.com/Pedro-gomes2" target="_blank">
              <GithubLogo href='https://github.com/Pedro-gomes2' size={32} weight="thin" className="hover:text-purple-400 cursor-pointer transition" />
            </Link>
          </div>
        </div>
      </footer>
    )

  }

  return (
    <>
      {component}
    </>
  )

>>>>>>> main
}

export default Footer;