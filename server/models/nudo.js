const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const nudoSchema = new Schema({
    //_id: Number,
    orden: Number,
    xPos: Number,
    yPos: Number,
    xFza: Number,
    yFza: Number,
    momem: Number
});

module.exports = mongoose.model('nudo', nudoSchema, 'nudos')
