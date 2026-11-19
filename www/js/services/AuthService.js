/**
 * AuthService
 * Mock de credenciais e controle de sessão do aluno.
 * O aluno logado fica em memória (no service e no $rootScope) e a matrícula
 * é guardada no localStorage para manter a sessão ao atualizar a página.
 */
angular.module('ucsalApp')
  .factory('AuthService', ['$rootScope', '$window', 'AlunoService',
    function ($rootScope, $window, AlunoService) {

      var CHAVE_SESSAO = 'ucsal.sessao';

      // Mock: credenciais válidas
      var credenciaisMock = [
        { matricula: '20261001', senha: '123456' },
        { matricula: '20261002', senha: 'ucsal2026' }
      ];

      var alunoLogado = null;

      function definirSessao(aluno) {
        alunoLogado = aluno;
        $rootScope.alunoLogado = aluno;
      }

      function lerSessaoSalva() {
        try {
          return $window.localStorage.getItem(CHAVE_SESSAO);
        } catch (e) {
          return null;
        }
      }

      function salvarSessao(matricula) {
        try {
          if (matricula) {
            $window.localStorage.setItem(CHAVE_SESSAO, matricula);
          } else {
            $window.localStorage.removeItem(CHAVE_SESSAO);
          }
        } catch (e) {
          // Sessão fica apenas em memória
        }
      }

      // Restaura a sessão anterior, se existir
      var matriculaSalva = lerSessaoSalva();
      if (matriculaSalva) {
        definirSessao(AlunoService.buscarPorMatricula(matriculaSalva));
      }

      return {
        /**
         * Valida matrícula e senha contra a lista mockada.
         * Retorna { sucesso: boolean, mensagem: string, aluno: object }
         */
        login: function (matricula, senha) {
          matricula = (matricula || '').toString().trim();
          senha = (senha || '').toString();

          if (!matricula || !senha) {
            return { sucesso: false, mensagem: 'Informe a matrícula e a senha.' };
          }

          var valida = credenciaisMock.some(function (c) {
            return c.matricula === matricula && c.senha === senha;
          });

          if (!valida) {
            return { sucesso: false, mensagem: 'Matrícula ou senha inválidas.' };
          }

          var aluno = AlunoService.buscarPorMatricula(matricula);
          definirSessao(aluno);
          salvarSessao(matricula);

          return { sucesso: true, mensagem: 'Bem-vindo(a)!', aluno: aluno };
        },

        logout: function () {
          definirSessao(null);
          salvarSessao(null);
        },

        estaAutenticado: function () {
          return alunoLogado !== null;
        },

        getAlunoLogado: function () {
          return alunoLogado;
        },

        /**
         * Atualiza os dados do aluno em sessão (ex.: após editar o cadastro).
         */
        atualizarAlunoLogado: function (aluno) {
          definirSessao(aluno);
        }
      };
    }
  ]);
