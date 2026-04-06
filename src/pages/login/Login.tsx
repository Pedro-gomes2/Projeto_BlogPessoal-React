import React from 'react'

function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-950 to-indigo-950 p-4">
      
      {/* Card Principal */}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl flex overflow-hidden border border-white/10">
        
        {/* Lado Esquerdo: Formulário de Login */}
        <div className="w-full md:w-1/2 p-8 lg:p-12">
          <div className="mb-10 text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Bem-vindo de volta</h1>
            <p className="text-gray-500 mt-2">Acesse sua conta para continuar</p>
          </div>

          <form className="space-y-6">
            {/* Campo Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">E-mail</label>
              <input 
                type="email" 
                placeholder="exemplo@email.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-hidden transition-all bg-gray-50 focus:bg-white text-gray-900 placeholder:text-gray-400"
              />
            </div>

            {/* Campo Senha */}
            <div>
              <div className="flex justify-between mb-1.5">
                <label className="text-sm font-semibold text-gray-700">Senha</label>
                <a href="#" className="text-xs text-indigo-600 hover:text-indigo-500 hover:underline font-medium">Esqueceu a senha?</a>
              </div>
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-hidden transition-all bg-gray-50 focus:bg-white text-gray-900 placeholder:text-gray-400"
              />
            </div>

            {/* Checkbox Lembrar-me */}
            <div className="flex items-center">
              <input type="checkbox" id="remember" className="w-4 h-4 text-indigo-600 border-gray-300 rounded-sm focus:ring-indigo-500 accent-indigo-600" />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-600">Lembrar de mim</label>
            </div>

            {/* Botão de Entrar */}
            <button 
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-indigo-100 hover:shadow-indigo-200 transition-all active:scale-98 cursor-pointer"
            >
              Entrar na conta
            </button>
          </form>

          {/* Rodapé do Login */}
          <div className="mt-8 pt-6 border-t border-gray-100 text-center relative z-20">
            <p className="text-sm text-gray-500">
              Ainda não tem conta? <a href="#" className="text-indigo-600 font-bold hover:text-indigo-500 hover:underline relative z-30">Cadastre-se</a>
            </p>
          </div>
        </div>

        {/* Lado Direito: Imagem Decorativa (Manteve-se limpa) */}
        <div className="hidden md:block md:w-1/2 relative bg-indigo-50">
            {/* Overlay com gradiente sobre a imagem - tons de indigo escuro */}
            <div className="absolute inset-0 bg-linear-to-t from-indigo-950/70 to-transparent z-10"></div>
            <img 
                src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800" 
                alt="Escritório moderno" 
                className="w-full h-full object-cover"
            />
            <div className="absolute bottom-10 left-10 z-20 text-white p-4">
                <p className="text-xl font-light italic leading-relaxed">"A melhor forma de prever o futuro é criá-lo."</p>
            </div>
        </div>
        
      </div>
    </div>
  )
}

export default Login