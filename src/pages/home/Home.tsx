

import ListaPostagens from "../../components/postagem/listapostagens/ListaPostagens"

import ModalPostagem from "../../components/postagem/modalpostagem/ModalPostagem"

function Home() {
	return (
		<>
			{/* Container */}
			<div className="bg-indigo-900 flex justify-center">
				{/* Grid que divide a tela em 2 colunas */}
				<div className="container grid grid-cols-1 sm:grid-cols-2 text-white">
					{/* Coluna esquerda */}
					<div className="flex flex-col gap-4 items-center justify-center py-4">
						<h2 className="text-5xl font-bold">Seja Bem Vindo!</h2>
						<p className="text-xl">Expresse aqui seus pensamentos e opiniões</p>

						{/* Link/Botão */}
						<div className="flex justify-around gap-4">
                            
                            <ModalPostagem />

                        </div>
					</div>

					{/* Coluna Direita */}
					<div className="flex justify-center">
						<img
							src="https://ik.imagekit.io/adb7vrzkj/projeto2/Gemini_Generated_Image_dssx30dssx30dssx.png"
							alt="Imagem da Página Home"
							className="w-2/3"
						/>
					</div>
				</div>
			</div>
			<ListaPostagens />
		</>
	)
}

export default Home