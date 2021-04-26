const { Sequelize } = require('sequelize');

// Option 1: Passing a connection URI
//const sequelize = new Sequelize('sqlite::memory:') // Example for sqlite
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'db.sqlite'
  });
const db = {}
db.type = Sequelize
db.con = sequelize

db.project = require('./project')(db.con,db.type)
db.task = require('./task')(db.con,db.type)

db.project.hasMany(db.task)
db.task.belongsTo(db.project)


module.exports = db 