/**
 * AlunoService
 * Simula a camada de acesso a dados cadastrais dos alunos.
 * Os dados ficam em memória e as alterações são persistidas no localStorage
 * para não se perderem ao recarregar a página.
 */
angular.module('ucsalApp')
  .service('AlunoService', ['$window', function ($window) {

    var CHAVE_STORAGE = 'ucsal.alunos';

    // Mock: dados cadastrais dos alunos
    var alunosMock = [
      {
        matricula: '20261001',
        nome: 'Ana Beatriz Santos Oliveira',
        curso: 'Engenharia de Software',
        campus: 'Pituaçu',
        email: 'ana.oliveira@email.com',
        telefone: '(71) 98765-4321',
        endereco: {
          cep: '41740-090',
          rua: 'Av. Prof. Pinto de Aguiar, 2589',
          bairro: 'Pituaçu',
          cidade: 'Salvador - BA'
        }
      },
      {
        matricula: '20261002',
        nome: 'Carlos Eduardo Lima Souza',
        curso: 'Engenharia de Software',
        campus: 'Federação',
        email: 'carlos.souza@email.com',
        telefone: '(71) 99123-4567',
        endereco: {
          cep: '40210-020',
          rua: 'Rua Caetano Moura, 120',
          bairro: 'Federação',
          cidade: 'Salvador - BA'
        }
      }
    ];

    // Carrega alterações salvas anteriormente (se houver) sobre o mock
    var alunos = carregar();

    function carregar() {
      try {
        var salvo = $window.localStorage.getItem(CHAVE_STORAGE);
        if (salvo) {
          return JSON.parse(salvo);
        }
      } catch (e) {
        // localStorage indisponível (ex.: modo privado): segue apenas em memória
      }
      return angular.copy(alunosMock);
    }

    function persistir() {
      try {
        $window.localStorage.setItem(CHAVE_STORAGE, angular.toJson(alunos));
      } catch (e) {
        // Mantém apenas em memória
      }
    }

    function encontrar(matricula) {
      for (var i = 0; i < alunos.length; i++) {
        if (alunos[i].matricula === matricula) {
          return alunos[i];
        }
      }
      return null;
    }

    /**
     * Retorna uma cópia dos dados do aluno (evita alteração direta do "banco").
     */
    this.buscarPorMatricula = function (matricula) {
      var aluno = encontrar(matricula);
      return aluno ? angular.copy(aluno) : null;
    };

    /**
     * Atualiza somente os campos editáveis (e-mail, telefone e endereço).
     * Matrícula, nome e curso são institucionais e não podem ser alterados.
     */
    this.atualizarContato = function (matricula, dados) {
      var aluno = encontrar(matricula);
      if (!aluno) {
        return null;
      }

      aluno.email = dados.email;
      aluno.telefone = dados.telefone;
      aluno.endereco = {
        cep: dados.endereco.cep,
        rua: dados.endereco.rua,
        bairro: dados.endereco.bairro,
        cidade: dados.endereco.cidade
      };

      persistir();
      return angular.copy(aluno);
    };

    /**
     * Restaura os dados originais do mock (útil para demonstração).
     */
    this.restaurarMock = function () {
      alunos = angular.copy(alunosMock);
      persistir();
    };
  }]);
