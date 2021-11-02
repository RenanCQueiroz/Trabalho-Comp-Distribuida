const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfessorSchema = new Schema({
    nome: {
        type: String,
        required: [true, 'nome required']
    },
    educacao: {
        type: String,
        required: [true, 'educacao required']
    }
});

module.exports = mongoose.model('Professor', ProfessorSchema);