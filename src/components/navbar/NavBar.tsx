import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="bg-[#2D2A8E] text-white py-4 px-6 flex justify-between items-center shadow-lg">
      <div className="text-2xl font-bold tracking-tight">
        <Link to="/home" className="text-2xl font font-bold">João
        <span className="text-purple-400">Blogs</span></Link>
      </div>
      
      <ul className="flex space-x-8 font-medium">
        
        <li className="hover:text-purple-300 cursor-pointer transition">Postagens</li>
        <li className="hover:text-purple-300 cursor-pointer transition">Temas</li>
        <li className="hover:text-purple-300 cursor-pointer transition">Cadastrar Tema</li>
        <li className="hover:text-purple-300 cursor-pointer transition">Perfil</li>
      </ul>

      <div className="flex items-center space-x-4">
        <button className="hover:underline">Sair</button>
      </div>
    </nav>
  );
}

export default NavBar;