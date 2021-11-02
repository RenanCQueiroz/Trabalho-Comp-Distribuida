const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DisciplinaSchema = new Schema({
    nome: {
        type: String,
        required: [true, 'nome required']
    },
    cargaHr: {
        type: Number,
        required: [true, 'cargaHr required']
    }
});

module.exports = mongoose.model('Disciplina', DisciplinaSchema);