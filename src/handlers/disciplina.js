//Permite acessar o mongo na collections de alunos
const DisciplinaModel = require('../models/disciplina');

const transformer = disciplina => ({
    type: 'disciplinas',
    id: disciplina.id,
    attributes: {
        nome: disciplina.nome,
        cargaHr: disciplina.cargaHr
    },
    links: {
        self: `/api/v1/disciplinas/${disciplina.id}`
    }
});

// getAll utilizado no GET 
const getAll = async function (request, h) {
    const disciplinas = await DisciplinaModel.find({});
    return { data: disciplinas.map(transformer) };
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
    const { nome, cargaHr } = req.payload;

    const disciplina = new DisciplinaModel;
    disciplina.nome = nome;
    disciplina.cargaHr = cargaHr;

    // save é assincrona (async adicionado no save)
    await disciplina.save();

    //Estrutura no qual oferece um link com o objeto criado
    //return h.response().code(200); // Apenas retorna cod 200
    return h.response(transformer(disciplina)).code(201);


    //Resposta quando for criado dentro de uma data: *Boas práticas*
    //return h.response({ data: aluno}).code(201);
};
// Delete 
// HapiJS busca os parâmetros pelo req.params
const remove = async (req, h) => {
    //console.log(req.params);
    //return 'DELETANDO..'
    await DisciplinaModel.findOneAndDelete({ _id: req.params.id });
    return h.response().code(204);
}
// HapiJS busca os parâmetros pelo req.params
const update = async (req, h) => {
    //console.log(req.params);
    //return 'Atualizando..'
    //const aluno = await DisciplinaModel.findById(req.params.id)
    const { nome, cargaHr } = req.payload;
    await DisciplinaModel.findOneAndUpdate({ _id: req.params.id }, {$set: {nome: nome, cargaHr: cargaHr}});
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