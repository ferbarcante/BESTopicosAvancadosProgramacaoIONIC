/**
 * PerfilCtrl - RF03 Atualização cadastral
 */
angular.module('ucsalApp')
  .controller('PerfilCtrl', ['$scope', '$ionicPopup', 'AuthService', 'AlunoService',
    function ($scope, $ionicPopup, AuthService, AlunoService) {

      var matricula = AuthService.getAlunoLogado().matricula;

      // Cópia de trabalho: o formulário só altera o service ao clicar em "Salvar"
      function carregar() {
        $scope.aluno = AlunoService.buscarPorMatricula(matricula);
        $scope.original = angular.copy($scope.aluno);
      }

      carregar();

      // Recarrega sempre que a tela é exibida (descarta edições não salvas)
      $scope.$on('$ionicView.beforeEnter', carregar);

      $scope.houveAlteracao = function () {
        return !angular.equals($scope.aluno, $scope.original);
      };

      $scope.salvar = function (form) {
        if (form.$invalid) {
          $ionicPopup.alert({
            title: 'Dados inválidos',
            template: 'Verifique os campos destacados antes de salvar.',
            okType: 'button-ucsal'
          });
          return;
        }

        var atualizado = AlunoService.atualizarContato(matricula, $scope.aluno);
        AuthService.atualizarAlunoLogado(atualizado);

        $scope.aluno = angular.copy(atualizado);
        $scope.original = angular.copy(atualizado);
        form.$setPristine();

        $ionicPopup.alert({
          title: 'Cadastro atualizado',
          template: 'Seus dados de contato foram salvos com sucesso.',
          okText: 'OK',
          okType: 'button-ucsal'
        });
      };

      $scope.descartar = function (form) {
        $scope.aluno = angular.copy($scope.original);
        form.$setPristine();
      };
    }
  ]);
