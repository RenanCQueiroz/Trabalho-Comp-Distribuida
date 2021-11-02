//Permite acessar o mongo na collections de alunos
const ProfessorModel = require('../models/professor');

const transformer = professor => ({
    type: 'professor',
    id: professor.id,
    attributes: {
        nome: professor.nome,
        educacao: professor.educacao
    },
    links: {
        self: `/api/v1/professores/${professor.id}`
    }
});

// getAll utilizado no GET 
const getAll = async function (request, h) {
    const professores = await ProfessorModel.find({});
    return { data: professores.map(transformer) };
};

// GET com o id
const find = async function (req, h) {
    const aluno = await DisciplinaModel.findById(req.params.id)
    return { data: transformer(disciplina) };
};

// save utilizado no POST
// req => requisição, h => resposta 
const save = async (req, h) => {
    //console.log(req.payload.nome, req.payload.price);
    const { nome, educacao } = req.payload;

    const professor = new ProfessorModel;
    professor.nome = nome;
    professor.educacao = educacao;


    // save é assincrona (async adicionado no save)
    await professor.save();

    //Estrutura no qual oferece um link com o objeto criado
    //return h.response().code(200); // Apenas retorna cod 200
    return h.response(transformer(professor)).code(201);


    //Resposta quando for criado dentro de uma data: *Boas práticas*
    //return h.response({ data: aluno}).code(201);
};
// Delete 
// HapiJS busca os parâmetros pelo req.params
const remove = async (req, h) => {
    //console.log(req.params);
    //return 'DELETANDO..'
    await AlunoModel.findOneAndDelete({ _id: req.params.id });
    return h.response().code(204);
}
// HapiJS busca os parâmetros pelo req.params
const update = async (req, h) => {
    //console.log(req.params);
    //return 'Atualizando..'
    //const aluno = await AlunoModel.findById(req.params.id)
    const { nome, educacao } = req.payload;
    await AlunoModel.findOneAndUpdate({ _id: req.params.id }, {$set: {nome: nome, educacao: educacao}});
    //console.log(req.params);
    return h.response().code(200);
    
}



// Exportar funções
module.exports = {
    getAll,
    save,
    remove,
    find,
    update
};