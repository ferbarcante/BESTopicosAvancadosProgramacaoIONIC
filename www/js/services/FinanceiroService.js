/**
 * FinanceiroService
 * Objeto mockado de mensalidades agrupadas por matrícula e por semestre letivo.
 */
angular.module('ucsalApp')
  .service('FinanceiroService', [function () {

    var STATUS = {
      PAGA: 'Paga',
      A_PAGAR: 'A Pagar'
    };

    var semestres = ['2025.2', '2026.1', '2026.2'];

    /**
     * Gera uma linha digitável fictícia (formato de boleto, 47 dígitos).
     * Apenas para fins de demonstração.
     */
    function linhaDigitavel(semente) {
      // Gerador pseudoaleatório determinístico: o mesmo boleto sempre gera a mesma linha
      var estado = 0;
      for (var i = 0; i < semente.length; i++) {
        estado = (estado * 31 + semente.charCodeAt(i)) % 2147483647;
      }
      var base = '23790';
      while (base.length < 47) {
        estado = (estado * 48271) % 2147483647;
        base += (estado % 10).toString();
      }
      return base.substr(0, 5) + '.' + base.substr(5, 5) + ' ' +
        base.substr(10, 5) + '.' + base.substr(15, 6) + ' ' +
        base.substr(21, 5) + '.' + base.substr(26, 6) + ' ' +
        base.substr(32, 1) + ' ' + base.substr(33, 14);
    }

    function parcela(semestre, numero, mes, vencimento, valor, status, dataPagamento) {
      var item = {
        id: semestre + '-' + numero,
        semestre: semestre,
        parcela: numero,
        mes: mes,
        vencimento: vencimento,
        valor: valor,
        status: status
      };
      if (status === STATUS.PAGA) {
        item.dataPagamento = dataPagamento;
      } else {
        item.codigoBarras = linhaDigitavel(semestre + '-' + numero + '-' + valor);
      }
      return item;
    }

    // Mock: mensalidades por aluno -> semestre
    var mensalidades = {
      '20261001': {
        '2025.2': [
          parcela('2025.2', 1, 'Julho/2025', '2025-07-10', 1489.90, STATUS.PAGA, '2025-07-08'),
          parcela('2025.2', 2, 'Agosto/2025', '2025-08-10', 1489.90, STATUS.PAGA, '2025-08-10'),
          parcela('2025.2', 3, 'Setembro/2025', '2025-09-10', 1489.90, STATUS.PAGA, '2025-09-05'),
          parcela('2025.2', 4, 'Outubro/2025', '2025-10-10', 1489.90, STATUS.PAGA, '2025-10-09'),
          parcela('2025.2', 5, 'Novembro/2025', '2025-11-10', 1489.90, STATUS.PAGA, '2025-11-10'),
          parcela('2025.2', 6, 'Dezembro/2025', '2025-12-10', 1489.90, STATUS.PAGA, '2025-12-03')
        ],
        '2026.1': [
          parcela('2026.1', 1, 'Janeiro/2026', '2026-01-10', 1562.40, STATUS.PAGA, '2026-01-09'),
          parcela('2026.1', 2, 'Fevereiro/2026', '2026-02-10', 1562.40, STATUS.PAGA, '2026-02-10'),
          parcela('2026.1', 3, 'Março/2026', '2026-03-10', 1562.40, STATUS.PAGA, '2026-03-07'),
          parcela('2026.1', 4, 'Abril/2026', '2026-04-10', 1562.40, STATUS.PAGA, '2026-04-10'),
          parcela('2026.1', 5, 'Maio/2026', '2026-05-10', 1562.40, STATUS.PAGA, '2026-05-06'),
          parcela('2026.1', 6, 'Junho/2026', '2026-06-10', 1562.40, STATUS.PAGA, '2026-06-10')
        ],
        '2026.2': [
          parcela('2026.2', 1, 'Julho/2026', '2026-07-10', 1562.40, STATUS.PAGA, '2026-07-10'),
          parcela('2026.2', 2, 'Agosto/2026', '2026-08-10', 1562.40, STATUS.PAGA, '2026-08-08'),
          parcela('2026.2', 3, 'Setembro/2026', '2026-09-10', 1562.40, STATUS.PAGA, '2026-09-10'),
          parcela('2026.2', 4, 'Outubro/2026', '2026-10-10', 1562.40, STATUS.PAGA, '2026-10-02'),
          parcela('2026.2', 5, 'Novembro/2026', '2026-11-10', 1562.40, STATUS.A_PAGAR),
          parcela('2026.2', 6, 'Dezembro/2026', '2026-12-10', 1562.40, STATUS.A_PAGAR)
        ]
      },
      '20261002': {
        '2025.2': [
          parcela('2025.2', 1, 'Julho/2025', '2025-07-10', 1489.90, STATUS.PAGA, '2025-07-10'),
          parcela('2025.2', 2, 'Agosto/2025', '2025-08-10', 1489.90, STATUS.PAGA, '2025-08-12'),
          parcela('2025.2', 3, 'Setembro/2025', '2025-09-10', 1489.90, STATUS.PAGA, '2025-09-10'),
          parcela('2025.2', 4, 'Outubro/2025', '2025-10-10', 1489.90, STATUS.PAGA, '2025-10-10'),
          parcela('2025.2', 5, 'Novembro/2025', '2025-11-10', 1489.90, STATUS.PAGA, '2025-11-11'),
          parcela('2025.2', 6, 'Dezembro/2025', '2025-12-10', 1489.90, STATUS.PAGA, '2025-12-10')
        ],
        '2026.1': [
          parcela('2026.1', 1, 'Janeiro/2026', '2026-01-10', 1562.40, STATUS.PAGA, '2026-01-10'),
          parcela('2026.1', 2, 'Fevereiro/2026', '2026-02-10', 1562.40, STATUS.PAGA, '2026-02-09'),
          parcela('2026.1', 3, 'Março/2026', '2026-03-10', 1562.40, STATUS.PAGA, '2026-03-10'),
          parcela('2026.1', 4, 'Abril/2026', '2026-04-10', 1562.40, STATUS.A_PAGAR),
          parcela('2026.1', 5, 'Maio/2026', '2026-05-10', 1562.40, STATUS.PAGA, '2026-05-10'),
          parcela('2026.1', 6, 'Junho/2026', '2026-06-10', 1562.40, STATUS.PAGA, '2026-06-09')
        ],
        '2026.2': [
          parcela('2026.2', 1, 'Julho/2026', '2026-07-10', 1562.40, STATUS.PAGA, '2026-07-10'),
          parcela('2026.2', 2, 'Agosto/2026', '2026-08-10', 1562.40, STATUS.PAGA, '2026-08-10'),
          parcela('2026.2', 3, 'Setembro/2026', '2026-09-10', 1562.40, STATUS.A_PAGAR),
          parcela('2026.2', 4, 'Outubro/2026', '2026-10-10', 1562.40, STATUS.A_PAGAR),
          parcela('2026.2', 5, 'Novembro/2026', '2026-11-10', 1562.40, STATUS.A_PAGAR),
          parcela('2026.2', 6, 'Dezembro/2026', '2026-12-10', 1562.40, STATUS.A_PAGAR)
        ]
      }
    };

    this.STATUS = STATUS;

    this.listarSemestres = function () {
      return semestres.slice();
    };

    /**
     * Semestre exibido por padrão (o mais recente).
     */
    this.semestreAtual = function () {
      return semestres[semestres.length - 1];
    };

    /**
     * Retorna as mensalidades de um aluno em um semestre letivo.
     */
    this.listarPorSemestre = function (matricula, semestre) {
      var doAluno = mensalidades[matricula] || {};
      return angular.copy(doAluno[semestre] || []);
    };

    /**
     * Soma os valores de uma lista de parcelas com um determinado status.
     */
    this.totalPorStatus = function (lista, status) {
      return lista.reduce(function (total, item) {
        return item.status === status ? total + item.valor : total;
      }, 0);
    };
  }]);
