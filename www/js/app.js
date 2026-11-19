/**
 * Portal do Aluno UCSal
 * Módulo principal da aplicação e configuração das rotas (ui-router).
 */
angular.module('ucsalApp', ['ionic'])

  .config(['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider',
    function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

      // Texto padrão do botão "voltar" e alinhamento do título
      $ionicConfigProvider.backButton.text('Voltar').previousTitleText(false);
      $ionicConfigProvider.navBar.alignTitle('center');

      $stateProvider

        // Tela pública: login
        .state('login', {
          url: '/login',
          templateUrl: 'templates/login.html',
          controller: 'LoginCtrl',
          data: { publica: true }
        })

        // Estado abstrato que contém o menu lateral (ion-side-menus)
        .state('app', {
          url: '/app',
          abstract: true,
          templateUrl: 'templates/menu.html',
          controller: 'MenuCtrl'
        })

        // RF02 - Mural de notícias e atividades (Home)
        .state('app.noticias', {
          url: '/noticias',
          views: {
            menuContent: {
              templateUrl: 'templates/noticias.html',
              controller: 'NoticiasCtrl'
            }
          }
        })

        // RF02 - Visualização completa de uma publicação
        .state('app.noticiaDetalhe', {
          url: '/noticias/:id',
          views: {
            menuContent: {
              templateUrl: 'templates/noticia-detalhe.html',
              controller: 'NoticiaDetalheCtrl'
            }
          }
        })

        // RF03 - Atualização cadastral
        .state('app.perfil', {
          url: '/perfil',
          views: {
            menuContent: {
              templateUrl: 'templates/perfil.html',
              controller: 'PerfilCtrl'
            }
          }
        })

        // RF04 - Consulta financeira
        .state('app.financeiro', {
          url: '/financeiro',
          views: {
            menuContent: {
              templateUrl: 'templates/financeiro.html',
              controller: 'FinanceiroCtrl'
            }
          }
        });

      // Rota padrão
      $urlRouterProvider.otherwise('/login');
    }
  ])

  .run(['$rootScope', '$state', '$locale', 'AuthService',
    function ($rootScope, $state, $locale, AuthService) {

      // Formatação numérica no padrão brasileiro (R$ 1.234,56) para o filtro currency
      $locale.NUMBER_FORMATS.DECIMAL_SEP = ',';
      $locale.NUMBER_FORMATS.GROUP_SEP = '.';
      $locale.NUMBER_FORMATS.CURRENCY_SYM = 'R$';

      // Guarda de rotas: telas internas exigem aluno autenticado
      $rootScope.$on('$stateChangeStart', function (event, toState) {
        var publica = toState.data && toState.data.publica;

        if (!publica && !AuthService.estaAutenticado()) {
          event.preventDefault();
          $state.go('login');
        } else if (toState.name === 'login' && AuthService.estaAutenticado()) {
          // Aluno já logado não precisa ver o login novamente
          event.preventDefault();
          $state.go('app.noticias');
        }
      });
    }
  ]);
