/**
 * NoticiasCtrl - RF02 Mural de notícias e atividades (Home)
 */
angular.module('ucsalApp')
  .controller('NoticiasCtrl', ['$scope', '$state', 'NoticiasService',
    function ($scope, $state, NoticiasService) {

      $scope.publicacoes = NoticiasService.listar();
      $scope.categorias = NoticiasService.listarCategorias();

      // Critério usado pelo filtro nativo "filter" no ng-repeat.
      // categoria vazia = todas as publicações.
      $scope.filtro = { categoria: '' };

      $scope.selecionarCategoria = function (categoria) {
        $scope.filtro.categoria = categoria;
      };

      $scope.lerMais = function (publicacao) {
        $state.go('app.noticiaDetalhe', { id: publicacao.id });
      };

      // Pull-to-refresh: recarrega a lista do service
      $scope.atualizar = function () {
        $scope.publicacoes = NoticiasService.listar();
        $scope.$broadcast('scroll.refreshComplete');
      };
    }
  ]);
