
function NavBar() {
  return (
    <nav className="bg-[#2D2A8E] text-white py-4 px-6 flex justify-between items-center shadow-lg">
      <div className="text-2xl font-bold tracking-tight">
        Meu<span className="text-purple-400">Blog</span>
      </div>
      
      <ul className="flex space-x-8 font-medium">
        <li className="hover:text-purple-300 cursor-pointer transition">Home</li>
        <li className="hover:text-purple-300 cursor-pointer transition">Postagens</li>
        <li className="hover:text-purple-300 cursor-pointer transition">Temas</li>
      </ul>

      <div className="flex items-center space-x-4">
        <button className="hover:underline">Sair</button>
      </div>
    </nav>
  );
}

export default NavBar;