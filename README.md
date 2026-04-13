🚀 Blog.Dev // Sistema de Gerenciamento de Conteúdo
O Blog.Dev é uma plataforma de blog moderna, desenvolvida com foco na experiência do desenvolvedor. O projeto utiliza uma interface baseada em Glassmorphism e estética Cyberpunk/Dark Mode, integrando um sistema completo de CRUD para postagens e temas.

📸 Interface do Sistema
A interface foi projetada para simular um ambiente de desenvolvimento (IDE).

Responsividade: Adaptado para dispositivos móveis e desktops.

🛠️ Tecnologias Utilizadas
Frontend
React 18: Biblioteca principal para construção da interface.

TypeScript: Tipagem estática para maior segurança e produtividade.

Tailwind CSS: Framework de estilização utilitária para design moderno.

React Router Dom: Gerenciamento de rotas e navegação.

Context API: Gerenciamento de estado global e autenticação.

Axios: Consumo de APIs REST.

React Spinners & Toastify: Feedback visual e notificações para o usuário.

⚙️ Funcionalidades
Autenticação
[x] Login de usuário com persistência de Token (JWT).

[x] Cadastro de novos usuários.

[x] Proteção de rotas (apenas usuários logados acessam o painel).

Gerenciamento de Temas (Categorias)
[x] Listagem de temas em grid.

[x] Criação de novos temas com estética de configuração .cfg.

[x] Edição de temas existentes.

[x] Exclusão de temas com confirmação de segurança (Critical Operation).

Gerenciamento de Postagens
[x] Feed de notícias dinâmico.

[x] CRUD completo de postagens vinculadas a temas.

🚀 Como Executar o Projeto
Bash
# 1. Clone o repositório
git clone https://github.com/Pedro-gomes2/Projeto_BlogPessoal-React

# 2. Acesse a pasta do projeto
cd blog-dev

# 3. Instale as dependências
npm install

# 4. Inicie o servidor de desenvolvimento
npm run dev
Nota: Certifique-se de configurar as variáveis de ambiente no arquivo .env para apontar para a URL correta do seu Backend.

📂 Estrutura de Pastas (Principais)
Plaintext
src/
 ├── components/       # Componentes reutilizáveis (Navbar, Footer, Cards)
 ├── contexts/         # Contextos da aplicação (AuthContext)
 ├── models/           # Interfaces e Tipagens (Postagem, Tema, Usuario)
 ├── pages/            # Páginas principais da aplicação
 ├── services/         # Configurações do Axios e chamadas à API
 └── util/             # Utilitários (Notificações, Validadores)
👨‍💻 Autor
Desenvolvido por João Pedro.
Conecte-se comigo:https://www.linkedin.com/in/jo%C3%A3o-pedro-oliveira-95b003255

📝 Licença
Este projeto está sob a licença MIT.