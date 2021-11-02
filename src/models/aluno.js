const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlunoSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name required']
    },
    rga: {
        type: String,
        required: [true, 'rga required']
    },
});

module.exports = mongoose.model('Aluno', AlunoSchema);