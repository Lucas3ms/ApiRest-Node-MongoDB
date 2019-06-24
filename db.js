var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/api');

var customerSchema = new mongoose.Schema({
    nome: String,
    clima: String,
    terreno: String
}, { collection: 'customers' },
    {versionKey: false}
);

module.exports = { Mongoose: mongoose, CustomerSchema: customerSchema }