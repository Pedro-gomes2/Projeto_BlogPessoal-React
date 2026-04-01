import React from 'react';
import { GithubLogo, InstagramLogo, LinkedinLogo } from '@phosphor-icons/react';

function Footer() {
  let data = new Date().getFullYear();

  return (
    <footer className="bg-[#2D2A8E] text-white py-8">
      <div className="container mx-auto flex flex-col items-center">
        <p className="text-lg font-semibold mb-4">
          Blog Pessoal | Copyright: {data}
        </p>
        <p className="text-sm mb-6">Acesse minhas redes sociais</p>
        
        <div className="flex space-x-6">
          <LinkedinLogo  href='nkedin.com/in/joão-pedro-oliveira-95b003255/'     size={32} weight="thin" className="hover:text-purple-400 cursor-pointer transition" />
          <InstagramLogo href='https://www.instagram.com/gomes.pedro2/'   size={32} weight="thin" className="hover:text-purple-400 cursor-pointer transition" />
          <GithubLogo href='https://github.com/Pedro-gomes2'   size={32} weight="thin" className="hover:text-purple-400 cursor-pointer transition" />
        </div>
      </div>
    </footer>
  );
}

export default Footer;