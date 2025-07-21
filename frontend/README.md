# Frontend - Loja de Brinquedos

## Setup

1. Instale as dependências:
   ```sh
   npm install
   ```
2. Rode o projeto em desenvolvimento:
   ```sh
   npm run dev
   ```
3. Para build de produção:
   ```sh
   npm run build
   # Para servir a build localmente
   npm run preview
   ```

## Estrutura

- `src/components/`: Componentes reutilizáveis
- `src/pages/`: Páginas principais (Login,Novo usuário, Home, Clientes, vendas)
- `src/services/`: Serviços de API
- `src/hooks/`: Hooks customizados (ex: useAuth)
- `src/assets/`: Imagens e arquivos estáticos
- `src/index.css`: Estilos globais e responsividade

## Funcionalidades

- Login com autenticação JWT
- CRUD de clientes (adicionar, editar, excluir)
- Cadastro de vendas para clientes
- Estatísticas com gráficos (Chart.js)
- Destaques visuais dos melhores clientes
- Lógica extra: primeira letra do alfabeto ausente no nome do cliente
- Validação de formulários com react-hook-form + zod
- Responsividade para mobile
- Proteção de rotas

## Prints de tela

> Adicione aqui prints das telas principais (Login, Clientes, Estatísticas)

## Observações

- O serviço de API está configurado para `http://localhost:3000/api` por padrão.
- Para produção, ajuste a URL da API conforme o backend.
- O frontend foi estruturado para fácil manutenção e expansão.

## Diferenciais

- Componentização e hooks customizados
- Validação robusta de formulários
- Experiência de usuário aprimorada (feedbacks, loaders)
- Pronto para deploy em Vercel, Netlify, etc.
