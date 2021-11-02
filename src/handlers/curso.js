//Permite acessar o mongo na collections de alunos
const CursoModel = require('../models/curso');

const transformer = curso => ({
    type: 'cursos',
    id: aluno.id,
    attributes: {
        nome: curso.name,
        codigo: curso.rga
    },
    links: {
        self: `/api/v1/cursos/${curso.id}`
    }
});

// getAll utilizado no GET 
const getAll = async function (request, h) {
    const cursos = await CursoModel.find({});
    return { data: cursos.map(transformer) };
};

// GET com o id
const find = async function (req, h) {
    const curso = await CursoModel.findById(req.params.id)
    return { data: transformer(curso) };
};

// save utilizado no POST
// req => requisição, h => resposta 
const save = async (req, h) => {
    //console.log(req.payload.name, req.payload.price);
    const { nome, codigo } = req.payload;

    const curso = new CursoModel;
    curso.nome = nome;
    curso.codigo = codigo;

    // save é assincrona (async adicionado no save)
    await curso.save();

    //Estrutura no qual oferece um link com o objeto criado
    //return h.response().code(200); // Apenas retorna cod 200
    return h.response(transformer(curso)).code(201);


    //Resposta quando for criado dentro de uma data: *Boas práticas*
    //return h.response({ data: aluno}).code(201);
};
// Delete 
// HapiJS busca os parâmetros pelo req.params
const remove = async (req, h) => {
    //console.log(req.params);
    //return 'DELETANDO..'
    await CursoModel.findOneAndDelete({ _id: req.params.id });
    return h.response().code(204);
}
// HapiJS busca os parâmetros pelo req.params
const update = async (req, h) => {
    //console.log(req.params);
    //return 'Atualizando..'
    //const aluno = await AlunoModel.findById(req.params.id)
    const { nome, codigo } = req.payload;
    await CursoModel.findOneAndUpdate({ _id: req.params.id }, {$set: {nome: nome, codigo: codigo}});
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