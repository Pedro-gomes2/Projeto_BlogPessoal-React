import type Postagem from "./Postagem";

export default interface Tema {
    id:Number;
    descricao:String;
    postagem?: Postagem[] | null;
}