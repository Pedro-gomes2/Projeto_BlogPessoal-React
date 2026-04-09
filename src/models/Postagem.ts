import type Tema from "./Tema";
import type Usuarios from "./Usuario";

export default interface Postagem {
    id:number;
    titulo:string;
    texto:string;
    data:string;
    tema:Tema | null;
    usuario:Usuarios | null;
}