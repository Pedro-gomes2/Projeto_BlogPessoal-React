


function Home() {
    return (
        <section 
            className=" bg-indigo-900 flex justify-center"
        >
            <article 
                className="container grid grid-cols-2 text-white"
            >
                
                    <div
                        className="flex flex-col justify-center items-center gap-4 py-4 "
                    >

                        <h2
                            className="text-5xl font-bold"
                        >Sejam Bem Vindo!!</h2>
                        <p 
                            className="text-xl"
                        >Expresse aqui seus pensamentos e opniões</p>
                        <div 
                            className="bg-indigo-700 px-4 py-2 rounded-lg cursor-pointer hover:bg-indigo-600 transition-colors duration-300"
                        >
                            <div 
                                className=" text-white  font-semibold"
                            >
                                Nova Postagem
                            </div>
                        </div>
                    </div>


                    <div 
                        className="flex justify-center items-center"
                    >

                        <img src="https://i.imgur.com/fyfri1v.png"
                            alt="Imagem Página Home" 
                            className="w-2/3 h-auto"
                        />


                    </div>




                

            </article>
        </section>
    )
}

export default Home 
