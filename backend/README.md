# Backend - Loja de Brinquedos

## Setup

1. Instale as dependências:
   ```sh
   npm install
   ```
2. Configure o arquivo `.env` com as variáveis:
   - `JWT_SECRET=sua_chave_secreta`
   - `PORT=3333`
   - `PORTDB=5432`
   - `HOST=localhost`
   - `USERDB=postgres`
   - `PASSWORD=root`
   - `DATABASE=loja_brinquedos`
3. Gere e rode as migrations:
   ```sh
    npm run migration:generate
    npm run migration:run
   ```
4. Rode o servidor em desenvolvimento:
   ```sh
   npm run dev
   ```

## Scripts úteis

- `npm run dev`: Inicia o servidor com ts-node-dev
- `npm run build`: Compila o TypeScript para a pasta dist
- `npm start`: Inicia o servidor em produção (node dist/server.js)
- `npm test`: Executa os testes automatizados

## Testes

```sh
npm test
```

## Estrutura

- `src/entities/`: Entidades do banco
- `src/controllers/`: Lógica das rotas
- `src/routes/`: Rotas da API
- `src/services/`: Regras de negócio
- `src/interfaces/`: Camada de acesso e persistência de dados
- `src/repositories/`: Camada de persistencia dos dados
- `src/middlewares/`: Middlewares (ex: autenticação, validação)
- `src/dto/`: DTOs e validações
- `src/tests/`: Testes automatizados

## Observações

- Use variáveis de ambiente para configurar o banco e JWT.
- Use migrations para criar as tabelas.
- O projeto já possui testes automatizados para autenticação, clientes e vendas.
