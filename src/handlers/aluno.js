//Permite acessar o mongo na collections de alunos
const AlunoModel = require('../models/aluno');


const transformer = aluno => ({
    type: 'alunos',
    id: aluno.id,
    attributes: {
        name: aluno.name,
        rga: aluno.rga
    },
    links: {
        self: `/api/v1/alunos/${aluno.id}`
    }
});



// getAll utilizado no GET 
const getAll = async function (request, h) {
    const alunos = await AlunoModel.find({});
    return { data: alunos.map(transformer) };
};

// GET com o id
const find = async function (req, h) {
    const aluno = await AlunoModel.findById(req.params.id)
    return { data: transformer(aluno) };
};

// save utilizado no POST
// req => requisição, h => resposta 
const save = async (req, h) => {
    //console.log(req.payload.name, req.payload.price);
    const { name, rga } = req.payload;

    const aluno = new AlunoModel;
    aluno.name = name;
    aluno.rga = rga;
    

    const valid = await AlunoModel.findOne({rga: aluno.rga})
    if (valid && valid === value){
        return h.response('RGA já cadastrado').code(400);        
    } else {
    


    // save é assincrona (async adicionado no save)
    await aluno.save();

    //Estrutura no qual oferece um link com o objeto criado
    //return h.response().code(200); // Apenas retorna cod 200
    return h.response(transformer(aluno)).code(201);

    } //fim else


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
    const { name, rga } = req.payload;
    await AlunoModel.findOneAndUpdate({ _id: req.params.id }, {$set: {name: name, rga: rga}});
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