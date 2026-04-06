import type Tema from "./Tema";
import type Usuarios from "./Usuario";

export default interface Postagem {
    id:Number;
    titulo:String;
    texto:String;
    data:String;
    tema:Tema | null;
    usuario:Usuarios | null;
}