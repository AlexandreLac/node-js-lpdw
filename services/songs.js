'use strict'
const db = require('../database');

exports.find = (query = {}) => {
  return db.Songs.findAll({
      where: query
  });
};

exports.create = (song) => {
  const model = db.Songs.build(song);
  return model.validate()
    .then(err => {
       if (err) {
           return Promise.reject(err);
       }
       return model.save();
    })
  ; 
};

exports.delete = (id) => {
  return db.Songs.destroy({
    where: {
      id: id
    }
  });
};

exports.deleteAll = (id) => {
  return db.Songs.destroy({
    where: {}
  });
};