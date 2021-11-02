//Permite acessar o mongo na collections de alunos
const BlocoModel = require('../models/bloco');


const transformer = bloco => ({
    type: 'blocos',
    id: bloco.id,
    attributes: {
        nome: bloco.nome
    },
    links: {
        self: `/api/v1/blocos/${bloco.id}`
    }
});



// getAll utilizado no GET 
const getAll = async function (request, h) {
    const blocos = await BlocoModel.find({});
    return { data: blocos.map(transformer) };
};

// GET com o id
const find = async function (req, h) {
    const bloco = await BlocoModel.findById(req.params.id)
    return { data: transformer(bloco) };
};

// save utilizado no POST
// req => requisição, h => resposta 
const save = async (req, h) => {
    //console.log(req.payload.name, req.payload.price);
    const { nome} = req.payload;

    const bloco = new BlocoModel;
    bloco.nome = nome;
    

    // save é assincrona (async adicionado no save)
    await aluno.save();

    //Estrutura no qual oferece um link com o objeto criado
    //return h.response().code(200); // Apenas retorna cod 200
    return h.response(transformer(aluno)).code(201);


    //Resposta quando for criado dentro de uma data: *Boas práticas*
    //return h.response({ data: aluno}).code(201);
};
// Delete 
// HapiJS busca os parâmetros pelo req.params
const remove = async (req, h) => {
    //console.log(req.params);
    //return 'DELETANDO..'
    await BlocoModel.findOneAndDelete({ _id: req.params.id });
    return h.response().code(204);
}
// HapiJS busca os parâmetros pelo req.params
const update = async (req, h) => {
    //console.log(req.params);
    //return 'Atualizando..'
    //const aluno = await AlunoModel.findById(req.params.id)
    const { nome} = req.payload;
    await BlocoModel.findOneAndUpdate({ _id: req.params.id }, {$set: {nome: nome}});
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