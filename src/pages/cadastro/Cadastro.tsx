import React from 'react'

function Cadastro() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-950 to-indigo-950 p-4 font-sans">
      
      {/* Container Principal (Card) */}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl flex overflow-hidden border border-white/20">
        
        {/* Lado Esquerdo: Formulário */}
        <div className="w-full md:w-1/2 p-8 lg:p-12">
          <div className="mb-8 text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Criar Conta</h1>
            <p className="text-gray-500 mt-2">Junte-se à nossa comunidade exclusiva</p>
          </div>

          <form className="space-y-5">
            {/* Campo Nome */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Nome Completo</label>
              <input 
                type="text" 
                placeholder="Ex: João Silva"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-hidden transition-all bg-gray-50 focus:bg-white text-gray-900 placeholder:text-gray-400"
              />
            </div>

            {/* Campo Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">E-mail</label>
              <input 
                type="email" 
                placeholder="seu@email.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-hidden transition-all bg-gray-50 focus:bg-white text-gray-900 placeholder:text-gray-400"
              />
            </div>

            {/* Campo Senha */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Senha</label>
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-hidden transition-all bg-gray-50 focus:bg-white text-gray-900 placeholder:text-gray-400"
              />
              <p className="text-xs text-gray-400 mt-2 italic">Mínimo de 8 caracteres com letras e números.</p>
            </div>

            {/* Termos de Uso */}
            <div className="flex items-start">
              <input type="checkbox" id="terms" className="mt-1 w-4 h-4 text-indigo-600 border-gray-300 rounded-sm focus:ring-indigo-500 accent-indigo-600" />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                Eu aceito os <a href="#" className="text-indigo-600 hover:underline font-medium">Termos de Serviço</a> e a <a href="#" className="text-indigo-600 hover:underline font-medium">Política de Privacidade</a>.
              </label>
            </div>

            {/* Botão de Ação */}
            <button 
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-indigo-100 hover:shadow-indigo-200 transition-all active:scale-98 cursor-pointer"
            >
              Criar minha conta
            </button>
          </form>

          {/* Rodapé do Cadastro */}
          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500">
              Já possui uma conta? <a href="#" className="text-indigo-600 font-bold hover:text-indigo-500 hover:underline transition-colors">Fazer Login</a>
            </p>
          </div>
        </div>

        {/* Lado Direito: Imagem Decorativa */}
        <div className="hidden md:block md:w-1/2 relative bg-indigo-50">
            {/* Overlay com gradiente sobre a imagem */}
            <div className="absolute inset-0 bg-linear-to-t from-indigo-950/80 via-indigo-900/20 to-transparent z-10"></div>
            <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800" 
                alt="Equipe trabalhando" 
                className="w-full h-full object-cover"
            />
            
            {/* Texto Flutuante sobre a imagem */}
            <div className="absolute bottom-12 left-10 right-10 z-20 text-white">
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
                    <h3 className="text-xl font-bold mb-2">Construa o amanhã conosco.</h3>
                    <p className="text-indigo-100 text-sm leading-relaxed">
                        Faça parte desta jornada. Comece hoje mesmo de forma gratuita.
                    </p>
                </div>
            </div>
        </div>
        
      </div>
    </div>
  )
}

export default Cadastro