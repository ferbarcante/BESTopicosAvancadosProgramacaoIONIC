/**
 * MenuCtrl - menu lateral (dados do aluno logado e logout)
 */
angular.module('ucsalApp')
  .controller('MenuCtrl', ['$scope', '$state', '$ionicHistory', '$ionicPopup', 'AuthService',
    function ($scope, $state, $ionicHistory, $ionicPopup, AuthService) {

      $scope.iniciais = function () {
        var aluno = AuthService.getAlunoLogado();
        if (!aluno) {
          return '';
        }
        var partes = aluno.nome.split(' ');
        return (partes[0].charAt(0) + partes[partes.length - 1].charAt(0)).toUpperCase();
      };

      $scope.primeiroNome = function () {
        var aluno = AuthService.getAlunoLogado();
        return aluno ? aluno.nome.split(' ')[0] : '';
      };

      $scope.sair = function () {
        $ionicPopup.confirm({
          title: 'Sair',
          template: 'Deseja realmente sair do Portal do Aluno?',
          cancelText: 'Cancelar',
          okText: 'Sair',
          okType: 'button-ucsal'
        }).then(function (confirmou) {
          if (!confirmou) {
            return;
          }
          AuthService.logout();
          $ionicHistory.clearHistory();
          $ionicHistory.clearCache().then(function () {
            $state.go('login');
          });
        });
      };
    }
  ]);
