const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { throwError } = require('rxjs');
const Nudo = require('../models/nudo');

const db = "mongodb+srv://XXXXXX"
mongoose.Promise = global.Promise;
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true}, function(err){
    if (err) {
        console.log("ERROR: " + err);
    }
});

router.get('/nudos', function(req, res, next){
    console.log('Request nudos');
    Nudo.find({})
    .exec(function(err, nudos){
        if (err) {
            console.log("Error al obtener nudos!");
            next(err);
        } else {
            res.json(nudos);
        }
    });
});

router.get('/nudos/:id', function(req, res, next){
    console.log('Request nudo por id');
    Nudo.findById(req.params.id)
    .exec(function(err, nudo){
        if (err) {
            console.log("Error al obtener nudo con id: " 
                                    + req.params.id + "!");
            next(err);
        } else {
            res.json(nudo);
        }
    });
});

router.post('/nudo', function(req, res, next){
    console.log('Crear un nudo');
    var nuevoNudo = new Nudo();
    nuevoNudo.xPos = req.body.xPos;
    nuevoNudo.yPos = req.body.yPos;
    nuevoNudo.xFza = req.body.xFza;
    nuevoNudo.yFza = req.body.yFza;
    nuevoNudo.momem = req.body.momem;
    nuevoNudo.save(function(err, nudoInsertado){
        if (err) {
            console.log("Error al insertar nudo");
            next(err);
        } else {
            res.json(nudoInsertado);
        }
    });
});

router.put('/nudo/:id', function(req, res, next){
    console.log("Editar nudo");
    Nudo.findByIdAndUpdate(req.params.id, {
            $set: {xPos: req.body.xPos, yPos: req.body.yPos, 
                   xFza: req.body.xFza, yFza: req.body.yFza, 
                   momem: req.body.momem}
        }, {
            new: true
        }, function(err, nudoEditado){
                if (err) {
                    console.log('Error al editar nudo');
                    next(err);
                } else {
                    res.json(nudoEditado);
                }
        }    
    );
});

router.delete('/nudo/:id', function(req,res, next){
    console.log("Borrar nudo");
    Nudo.findByIdAndRemove(req.params.id, function(err, nudoBorrado) {
        if (err) {
            console.log("Error al borrar nudo con id " + req.params.id);
            next(err);
        } else {
            res.json(nudoBorrado);
        }
    });
});

module.exports = router;
