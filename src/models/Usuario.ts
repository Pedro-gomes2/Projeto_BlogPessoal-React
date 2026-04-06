import type Postagem from "./Postagem";


export default interface Usuario {
    id:Number;
    nome:String;
    usuario:String;
    senha:String;
    foto:String;
    postagem?: Postagem[] | null;

}
