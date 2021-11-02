// importar Handlers/controllers
const alunoHandler = require('./handlers/aluno');
const professorHandler = require('./handlers/professor');
const disciplinaHandler = require('./handlers/disciplina');
const cursoHandler = require('./handlers/curso');


// Expportar rotas (import no index.js)
// Vetor
module.exports = [
    //Aluno
    {
        method: 'GET',
        path: '/api/v1/alunos',
        handler: alunoHandler.getAll
    },
    {
        method: 'GET',
        path: '/api/v1/alunos/{id}',
        handler: alunoHandler.find
    },
    {
        method: 'POST',
        path: '/api/v1/alunos',
        handler: alunoHandler.save
    },
    {
        method: 'DELETE',
        path: '/api/v1/alunos/{id}',
        handler: alunoHandler.remove,
        options: {
            cors: true
        }
    },
    {
        method: 'PUT',
        path: '/api/v1/alunos/{id}',
        handler: alunoHandler.update
    },

    //Disciplina
    {
        method: 'GET',
        path: '/api/v1/disciplinas',
        handler: disciplinaHandler.getAll
    },
    {
        method: 'POST',
        path: '/api/v1/disciplinas',
        handler: disciplinaHandler.save
    },

    //Professor
    {
        method: 'GET',
        path: '/api/v1/professores',
        handler: professorHandler.getAll
    },
    {
        method: 'POST',
        path: '/api/v1/professores',
        handler: professorHandler.save
    },
    
    //Curso
    {
        method: 'POST',
        path: '/api/v1/cursos',
        handler: cursoHandler.save
    },
    {
        method: 'GET',
        path: '/api/v1/cursos',
        handler: cursoHandler.getAll
    }
]