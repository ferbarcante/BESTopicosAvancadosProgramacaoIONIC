# Portal do Aluno UCSal

MVP front-end de um aplicativo multiplataforma para autoatendimento dos estudantes da Universidade Católica do Salvador, desenvolvido com **Ionic Framework (v1)** e **AngularJS**.

> Disciplina: Tópicos Avançados de Programação. Escola de Tecnologias, UCSal.
> Não há banco de dados nem back-end: todos os dados são mockados nos Services do AngularJS.

## Como executar

Pré-requisito: Node.js (funciona também no GitHub Codespaces).

```bash
npm install
npm start          # abre http://localhost:8100
```

Sem instalar dependências:

```bash
npx http-server www -p 8100
```

Com o Ionic CLI instalado, `ionic serve` também funciona (o projeto está configurado como `ionic1` em `ionic.config.json`).

A biblioteca do Ionic v1 (que já inclui AngularJS e ui-router) está em `www/lib/ionic`, então o app roda sem internet.

### Acessos de demonstração

| Matrícula | Senha       | Observação                               |
|-----------|-------------|------------------------------------------|
| 20261001  | 123456      | 2 parcelas a pagar em 2026.2             |
| 20261002  | ucsal2026   | Parcelas a pagar em 2026.1 e 2026.2      |

Para restaurar os dados originais, limpe o `localStorage` do navegador (chaves `ucsal.alunos` e `ucsal.sessao`).

## Funcionalidades (backlog)

| Requisito | Tela | O que faz |
|-----------|------|-----------|
| RF01 Autenticação | `login.html` | Valida matrícula/senha no `AuthService` e bloqueia campos vazios. O aluno logado fica no service e em `$rootScope.alunoLogado`, e a sessão sobrevive a um refresh. |
| RF02 Mural | `noticias.html` / `noticia-detalhe.html` | Cards com imagem, título, data e categoria, filtro por Notícia/Evento, botão "Ler mais" que abre o conteúdo completo e pull-to-refresh. |
| RF03 Atualização cadastral | `perfil.html` | Nome, matrícula e curso são somente leitura. E-mail, telefone e endereço são editáveis com validação, salvos no `AlunoService` e no `localStorage`, com feedback via `$ionicPopup`. |
| RF04 Financeiro | `financeiro.html` | Seletor de semestre (2025.2, 2026.1, 2026.2), totais pago e a pagar, badge verde para Paga e laranja para A Pagar, filtro por status e botão "Copiar Código de Barras" com confirmação visual. |

Outros comportamentos:

- Rotas internas protegidas: quem não está logado é redirecionado para o login.
- Logout com confirmação no menu lateral.

## Onde cada recurso do AngularJS é usado

| Recurso | Onde |
|---------|------|
| `angular.module('ucsalApp', ['ionic'])` | `www/js/app.js` |
| `$stateProvider` / `$urlRouterProvider` | `www/js/app.js`: estados `login`, `app` (abstrato, menu lateral), `app.noticias`, `app.noticiaDetalhe`, `app.perfil` e `app.financeiro` |
| `.service()` / `.factory()` | `www/js/services/*`: `AuthService` (factory), `AlunoService`, `NoticiasService` e `FinanceiroService` (services) |
| `.controller()` + `$scope` | `www/js/controllers/*` |
| `ng-model` | login, formulário de cadastro, seletor de semestre |
| `ng-repeat` | cards de notícias, parágrafos do detalhe, lista de mensalidades |
| `ng-click` | entrar, ler mais, salvar alterações, copiar código de barras, filtros, sair |
| `ng-if` / `ng-show` / `ng-class` | mensagens de erro, estados vazios, badges Paga/A Pagar, campos inválidos |
| `ng-disabled` | Nome, Matrícula e Curso no cadastro; botão salvar enquanto não há alteração válida |
| Filtro `currency` | valores das parcelas e totais (`R$ 1.562,40`, com separadores pt-BR configurados no `run`) |
| Filtro `filter` | notícias por categoria e mensalidades por status |
| Filtro `date` | datas de publicação, vencimento e pagamento |

### Isolamento dos dados

Nenhum array de dados fica nos templates HTML ou nos controllers. Os controllers só chamam métodos dos services, por exemplo `NoticiasService.listar()`, `FinanceiroService.listarPorSemestre(matricula, semestre)` e `AlunoService.atualizarContato(matricula, dados)`. Os services funcionam como uma camada de acesso a dados simulada e devolvem cópias (`angular.copy`), de modo que a view só altera o "banco" pelos métodos de atualização.

### Identidade visual

As cores institucionais (azul marinho `#0b2a5b`, azul claro `#3fa9f5` e branco) ficam em variáveis CSS no `:root` de `www/css/style.css` e são aplicadas nas classes de tema (`bar-ucsal`, `button-ucsal`, badges etc.).

## Estrutura

```
www/
├── css/style.css               # Tema UCSal (variáveis CSS)
├── img/                        # Logo e ilustrações (SVG)
├── lib/ionic/                  # Ionic v1 bundle (Ionic + AngularJS + ui-router)
├── js/
│   ├── app.js                  # Módulo, rotas e guarda de autenticação
│   ├── controllers/
│   │   ├── LoginCtrl.js
│   │   ├── MenuCtrl.js
│   │   ├── NoticiasCtrl.js
│   │   ├── NoticiaDetalheCtrl.js
│   │   ├── PerfilCtrl.js
│   │   └── FinanceiroCtrl.js
│   └── services/
│       ├── AuthService.js      # Credenciais mockadas e sessão
│       ├── AlunoService.js     # Dados cadastrais e edição
│       ├── NoticiasService.js  # Notícias e eventos
│       └── FinanceiroService.js# Mensalidades por semestre
├── templates/
│   ├── login.html
│   ├── menu.html
│   ├── noticias.html
│   ├── noticia-detalhe.html
│   ├── perfil.html
│   └── financeiro.html
└── index.html
```
