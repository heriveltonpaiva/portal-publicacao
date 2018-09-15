var ObjectID = require('mongodb').ObjectID;
const Categoria = require('../models/categoria.model.js');

exports.findAll = async(req, res) => {
    const categorias = await Categoria.find().sort({'descricao': 1});
    res.json(categorias);
};

exports.findById = async(req, res) => {
    let id = {_id: ObjectID(req.params.id)};
    const categoria = await Categoria.findOne({_id:id}).catch(err => {
        throw new Error(err);
    });
    res.json(categoria);
};

exports.update = async(req, res) => {
    let id = {_id: ObjectID(req.params.id)};
     Categoria.update({_id: id}, {
     $set:{'descricao': req.body.descricao}})
     .catch(err => {
         throw new Error(err);
       });
     res.status(200).json({status:true})
 };

exports.save = async(req, res) => {
    const novoDoc = new Categoria(req.body);
    try {
        await novoDoc.save();
    }catch (error) {
        console.log(error.toString());
        res.status(500).json(error.toString());
    }
    res.status(200).json({status:true});
};

exports.delete = async(req, res) => {
    let id = {_id: ObjectID(req.params.id)};
    Categoria.deleteOne({_id:id}).catch(err => {
      throw new Error(err);
    });
    res.status(200).json({status:true})
};


