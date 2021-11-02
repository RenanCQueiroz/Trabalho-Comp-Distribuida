const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlocoSchema = new Schema({
    nome: {
        type: String,
        required: [true, 'nome required']
    }
});

module.exports = mongoose.model('Bloco', BlocoSchema);