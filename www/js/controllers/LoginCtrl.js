/**
 * LoginCtrl - RF01 Autenticação (login mockado)
 */
angular.module('ucsalApp')
  .controller('LoginCtrl', ['$scope', '$state', '$ionicHistory', 'AuthService',
    function ($scope, $state, $ionicHistory, AuthService) {

      // Objeto ligado aos campos via ng-model
      $scope.credenciais = { matricula: '', senha: '' };
      $scope.erro = '';
      $scope.tentouEnviar = false;

      $scope.entrar = function () {
        $scope.tentouEnviar = true;
        $scope.erro = '';

        var resultado = AuthService.login($scope.credenciais.matricula, $scope.credenciais.senha);

        if (!resultado.sucesso) {
          $scope.erro = resultado.mensagem;
          $scope.credenciais.senha = '';
          return;
        }

        // Home passa a ser a raiz do histórico (sem botão "voltar" para o login)
        $ionicHistory.nextViewOptions({ disableBack: true, historyRoot: true });
        $scope.credenciais = { matricula: '', senha: '' };
        $scope.tentouEnviar = false;
        $state.go('app.noticias');
      };

      // Limpa a mensagem de erro assim que o usuário volta a digitar
      $scope.limparErro = function () {
        $scope.erro = '';
      };
    }
  ]);
