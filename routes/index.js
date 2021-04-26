var express = require('express');
var router = express.Router();
const db = require('../models')

/* GET home page. */
router.get('/',async function(req, res, next) {
  let projects = await db.project.findAll({
    include:['tasks']
  });
  res.render('index', {page:'project', title: 'Projects',projects:projects });
});

router.get('/projects/:id/tasks',async function(req, res, next) {
  let project = await db.project.findByPk(req.params.id);
  let tasks = []
  if(!req.query.status || req.query.status === 'all'){
    tasks = await db.task.findAll({where:{projectId:project.id}})
  }
  if(!!req.query.status && req.query.status !== 'all'){
    tasks = await db.task.findAll({where:{projectId:project.id,status:req.query.status}})
  }
  project.tasks = tasks

  res.render('tasks', { page:'tasks', title: 'Tasks',project:project });
});

router.post('/tasks/create',async function(req, res, next) {
  await db.task.create(req.body);
  res.redirect('/projects/'+req.body.projectId+'/tasks')
});

router.put('/tasks/update/:id',async function(req, res, next) {
  try {
    await db.task.update({status:req.body.status},{where:{id:req.params.id}});
    res.json("Success")
  } catch (error) {
    res.status(500).json(error)
  }


});

router.get('/tasks/delete/:id',async function(req, res, next) {
    await db.task.destroy({where:{id:req.params.id}});
    res.redirect('back')

});

router.post('/projects/create',async function(req, res, next) {
  await db.project.create(req.body);
  res.redirect('/')
});

router.get('/projects/delete/:id',async function(req, res, next) {
  await db.task.destroy({where:{projectId:req.params.id}});
  await db.project.destroy({where:{id:req.params.id}});
  res.redirect('/')
});

module.exports = router;
