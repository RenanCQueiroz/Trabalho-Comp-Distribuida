const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CursoSchema = new Schema({
    nome: {
        type: String,
        required: [true, 'nome required']
    },
    codigo: {
        type: Number,
        required: [true, 'codigo required']
    }
});

module.exports = mongoose.model('Curso', CursoSchema);