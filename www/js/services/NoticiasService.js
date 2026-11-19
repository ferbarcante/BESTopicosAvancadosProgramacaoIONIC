/**
 * NoticiasService
 * Array mockado de notícias institucionais e atividades/eventos da UCSal.
 */
angular.module('ucsalApp')
  .service('NoticiasService', [function () {

    // Mock: publicações do mural (categoria: 'Notícia' ou 'Evento')
    var publicacoes = [
      {
        id: 1,
        titulo: 'Rematrícula 2027.1: prazos e orientações',
        data: '2026-11-18',
        categoria: 'Notícia',
        imagem: 'img/rematricula.svg',
        resumo: 'O período de rematrícula on-line para o semestre 2027.1 começa em 1º de dezembro.',
        local: 'Portal do Aluno',
        conteudo: [
          'A Secretaria Acadêmica informa que a rematrícula para o semestre 2027.1 será realizada de 01 a 15 de dezembro de 2026, exclusivamente pelo Portal do Aluno.',
          'Para efetivar a rematrícula, o estudante deve estar adimplente com as mensalidades do semestre vigente e ter o cadastro atualizado (e-mail e telefone).',
          'Dúvidas podem ser encaminhadas à Central de Atendimento nos campi Pituaçu e Federação, de segunda a sexta, das 8h às 20h.'
        ]
      },
      {
        id: 2,
        titulo: 'SEMOC 2026: Semana de Mobilização Científica',
        data: '2026-11-24',
        categoria: 'Evento',
        imagem: 'img/semoc.svg',
        resumo: 'Palestras, minicursos e apresentação de trabalhos científicos de todas as escolas.',
        local: 'Campus Pituaçu',
        conteudo: [
          'A Semana de Mobilização Científica (SEMOC) chega a mais uma edição reunindo pesquisadores, docentes e estudantes em torno da produção científica da universidade.',
          'A programação inclui palestras, mesas-redondas, minicursos e sessões de apresentação de trabalhos. A participação conta como horas de atividades complementares.',
          'As inscrições para ouvintes são gratuitas e podem ser feitas no credenciamento do evento.'
        ]
      },
      {
        id: 3,
        titulo: 'Edital PIBIC 2027: inscrições abertas',
        data: '2026-11-10',
        categoria: 'Notícia',
        imagem: 'img/iniciacao.svg',
        resumo: 'Bolsas de iniciação científica para estudantes de graduação. Inscrições até 05/12.',
        local: 'Pró-Reitoria de Pesquisa',
        conteudo: [
          'Está publicado o edital do Programa Institucional de Bolsas de Iniciação Científica (PIBIC) para o ciclo 2027.',
          'Podem participar estudantes regularmente matriculados, com coeficiente de rendimento igual ou superior a 7,0, vinculados a um projeto de pesquisa de docente orientador.',
          'A submissão das propostas deve ser feita até 05 de dezembro de 2026. Consulte o edital completo na Pró-Reitoria de Pesquisa e Pós-Graduação.'
        ]
      },
      {
        id: 4,
        titulo: 'Maratona de Programação UCSal 2026',
        data: '2026-12-06',
        categoria: 'Evento',
        imagem: 'img/maratona.svg',
        resumo: 'Equipes de até 3 estudantes resolvem desafios de algoritmos em 5 horas de prova.',
        local: 'Laboratórios da Escola de Tecnologias - Pituaçu',
        conteudo: [
          'A Escola de Tecnologias promove a Maratona de Programação UCSal, aberta a estudantes de todos os cursos de tecnologia.',
          'As equipes, formadas por até 3 integrantes, terão 5 horas para resolver problemas de algoritmos nas linguagens C, C++, Java ou Python.',
          'As três equipes mais bem colocadas serão indicadas para representar a universidade na etapa regional da Maratona SBC.'
        ]
      },
      {
        id: 5,
        titulo: 'Projeto de extensão leva oficinas de tecnologia a escolas públicas',
        data: '2026-11-05',
        categoria: 'Evento',
        imagem: 'img/extensao.svg',
        resumo: 'Estudantes voluntários ministram oficinas de lógica de programação para o ensino médio.',
        local: 'Escolas parceiras em Salvador',
        conteudo: [
          'O projeto de extensão "Código para Todos" está com inscrições abertas para estudantes voluntários interessados em ministrar oficinas de lógica de programação.',
          'As atividades acontecem aos sábados em escolas públicas parceiras e contam como horas de extensão curricularizada.',
          'Os interessados devem procurar a coordenação do curso até o fim do mês.'
        ]
      },
      {
        id: 6,
        titulo: 'Biblioteca amplia horário durante o período de provas',
        data: '2026-11-01',
        categoria: 'Notícia',
        imagem: 'img/biblioteca.svg',
        resumo: 'Bibliotecas dos campi Pituaçu e Federação funcionarão até as 22h.',
        local: 'Campi Pituaçu e Federação',
        conteudo: [
          'Durante o período de avaliações finais, as bibliotecas dos campi Pituaçu e Federação terão horário estendido, funcionando de segunda a sexta das 7h às 22h.',
          'Aos sábados, o atendimento será das 8h às 14h. As salas de estudo em grupo podem ser reservadas pelo balcão de atendimento.'
        ]
      }
    ];

    var categorias = ['Notícia', 'Evento'];

    /**
     * Lista todas as publicações, das mais recentes para as mais antigas.
     */
    this.listar = function () {
      return angular.copy(publicacoes).sort(function (a, b) {
        return a.data < b.data ? 1 : -1;
      });
    };

    this.listarCategorias = function () {
      return categorias.slice();
    };

    this.buscarPorId = function (id) {
      id = parseInt(id, 10);
      for (var i = 0; i < publicacoes.length; i++) {
        if (publicacoes[i].id === id) {
          return angular.copy(publicacoes[i]);
        }
      }
      return null;
    };
  }]);
