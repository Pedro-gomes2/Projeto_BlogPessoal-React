import { createContext, useState, type ReactNode } from "react";
import type UsuariosLogin from "../models/UsuarioLogin";
import { login } from "../services/Service";

interface AuthContextProps{
    usuario: UsuariosLogin ;
    handleLogout():  void;
    handleLogin(usuario: UsuariosLogin) : Promise<void>;
    isLoading: boolean;
}

interface AuthProviderProps{
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextProps)

export function AuthProvider({children}: AuthProviderProps){
    // inicialização do estado do usuário ( armazernar os dados do usuario autentucado)
    const [usuario, setUsuario] = useState<UsuariosLogin>({
        id: 0,
        nome: "",
        usuario: "",
        senha: "",
        foto: "",
        token: ""
    });
    // inicialização do estado de loading ( controlar o loader do componetnte login )
    const [isLoading, setIsLoading] = useState<boolean>(false);

    //implemteação da função de login
    async function handleLogin(usuariologin: UsuariosLogin){
        
        setIsLoading(true);
       try {
        await login('/usuarios/logar', usuariologin, setUsuario);
        alert('Login autenticado com sucesso!');
       }catch (error) {
        alert('Dados do usuario incorretos!');
       }

       setIsLoading(false);
    }

    // implementação da função de logout
    function handleLogout(){
        setUsuario({
            id: 0,
            nome: "",
            usuario: "",
            senha: "",
            foto: "",
            token: ""
        });
    }

    return(
        <AuthContext.Provider value={{usuario, handleLogin, handleLogout, isLoading}}>
            {children}
        </AuthContext.Provider>
    )   

}