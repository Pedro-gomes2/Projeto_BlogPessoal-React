import axios from "axios"

const api = axios.create({
    baseURL: 'https://blogpessoal-joao-pedro.onrender.com',
});

//função para Cadastrar Usuario
export const cadastrarUsuario = async (url: string, dados: Object, setDados: Function) => {
    
    const resposta = await api.post(url, dados)

    setDados(resposta.data);

}


//função para Autenticar Usuario
export const login = async (url: string, dados: Object, setDados: Function) => {
    
    const resposta = await api.post(url, dados)

    setDados(resposta.data);

}

