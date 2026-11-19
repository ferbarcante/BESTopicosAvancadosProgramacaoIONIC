/**
 * FinanceiroCtrl - RF04 Consulta financeira (mensalidades por semestre)
 */
angular.module('ucsalApp')
  .controller('FinanceiroCtrl', ['$scope', '$q', '$window', '$timeout', '$ionicLoading', 'AuthService', 'FinanceiroService',
    function ($scope, $q, $window, $timeout, $ionicLoading, AuthService, FinanceiroService) {

      var matricula = AuthService.getAlunoLogado().matricula;

      $scope.STATUS = FinanceiroService.STATUS;
      $scope.semestres = FinanceiroService.listarSemestres();

      // Valores ligados via ng-model (seletor de semestre e filtro de status)
      $scope.selecao = {
        semestre: FinanceiroService.semestreAtual(),
        status: ''
      };

      $scope.copiadoId = null;

      $scope.carregarMensalidades = function () {
        $scope.mensalidades = FinanceiroService.listarPorSemestre(matricula, $scope.selecao.semestre);
        $scope.totalPago = FinanceiroService.totalPorStatus($scope.mensalidades, FinanceiroService.STATUS.PAGA);
        $scope.totalAPagar = FinanceiroService.totalPorStatus($scope.mensalidades, FinanceiroService.STATUS.A_PAGAR);
        $scope.copiadoId = null;
      };

      $scope.carregarMensalidades();

      $scope.filtrarStatus = function (status) {
        $scope.selecao.status = status;
      };

      $scope.estaPaga = function (mensalidade) {
        return mensalidade.status === FinanceiroService.STATUS.PAGA;
      };

      $scope.copiarCodigo = function (mensalidade) {
        copiarParaAreaDeTransferencia(mensalidade.codigoBarras).then(function () {
          $scope.copiadoId = mensalidade.id;
          $ionicLoading.show({
            template: '<i class="icon ion-checkmark-circled"></i> Código de barras copiado!',
            noBackdrop: true,
            duration: 1800
          });
          $timeout(function () {
            if ($scope.copiadoId === mensalidade.id) {
              $scope.copiadoId = null;
            }
          }, 3000);
        });
      };

      /**
       * Copia um texto usando a Clipboard API, com fallback para navegadores
       * antigos/contextos não seguros (document.execCommand).
       * Sempre resolve: a linha digitável continua visível no card para cópia manual.
       */
      function copiarParaAreaDeTransferencia(texto) {
        var navegador = $window.navigator;
        if (navegador.clipboard && $window.isSecureContext) {
          // $q.when integra a Promise nativa ao ciclo de digest do AngularJS
          return $q.when(navegador.clipboard.writeText(texto)).catch(function () {
            copiarComTextarea(texto);
          });
        }
        copiarComTextarea(texto);
        return $q.when();
      }

      function copiarComTextarea(texto) {
        var documento = $window.document;
        var campo = documento.createElement('textarea');
        campo.value = texto;
        campo.setAttribute('readonly', '');
        campo.style.position = 'fixed';
        campo.style.opacity = '0';
        documento.body.appendChild(campo);
        campo.select();
        try {
          documento.execCommand('copy');
        } catch (e) {
          // Sem suporte: o usuário ainda pode copiar manualmente a linha exibida
        }
        documento.body.removeChild(campo);
      }
    }
  ]);
