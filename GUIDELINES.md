# Orientações Iniciais do Projeto PCM

⚠️ **LEIA ANTES DE QUALQUER ALTERAÇÃO NO CÓDIGO**

## Regras Fundamentais
### Idioma e Convenções de Nomenclatura
1. **Documentação e Comunicação**
   - Toda documentação explicativa DEVE estar em português brasileiro
   - Comentários no código devem estar em português brasileiro
   - Comunicação em issues e PRs em português brasileiro

2. **Nomenclatura Técnica (Padrões Internacionais)**
   - Arquivos: minúsculas com hífens (`user-service.ts`)
   - Diretórios: minúsculas com hífens (`api-docs/`)
   - Classes: PascalCase (`UserController`)
   - Funções/Variáveis: camelCase (`getUserById`)
   - Constantes: UPPERCASE com underscore (`MAX_RETRY_COUNT`)
   - Banco de Dados: snake_case para tabelas e colunas (`user_profiles`)

3. **Padrões de Código**
   - TypeScript com modo estrito ativado
   - Commits semânticos (feat, fix, docs, etc)
   - Regras do ESLint devem ser seguidas

## Estrutura do Projeto
```
frontend/     # Aplicação React + Material-UI
backend/      # API Node.js + Prisma + Express
_docs/        # Documentação completa
  ├── diretrizes/    # Padrões e guidelines
  ├── tecnico/       # Docs técnicos
  ├── backups/       # Histórico de alterações
  └── estrutura/     # Organização do projeto
```

## Links Importantes
- [Documentação Técnica](_docs/tecnico/README.md)
- [Diretrizes de Desenvolvimento](_docs/diretrizes/desenvolvimento.md)
- [Estrutura do Projeto](_docs/estrutura/README.md)

## Primeiros Passos
1. Leia este documento completamente
2. Consulte a documentação técnica relevante em `_docs/tecnico/`
3. Siga as diretrizes em `_docs/diretrizes/`
4. Configure seu ambiente conforme `_docs/diretrizes/ambiente.md`

## Fluxo de Desenvolvimento
```bash
# 1. Crie uma branch para sua feature
git checkout -b feature/nome-da-feature

# 2. Desenvolva seguindo os padrões
npm run lint    # Verifique o código
npm run test   # Execute os testes

# 3. Commit com mensagem semântica
git commit -m "feat: adiciona funcionalidade X"

# 4. Push e Pull Request
git push origin feature/nome-da-feature
```

## Contato
Para dúvidas ou problemas:
1. Consulte a documentação em `_docs/`
2. Verifique issues existentes
3. Abra uma nova issue
4. Contate a equipe de desenvolvimento
