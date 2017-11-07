const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

//GET - api/users
router.get('/', (req, res, next) => {
  User.findAll()
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    //attributes: ['id', 'email']
    .then(users => res.json(users))
    .catch(next)
})

//POST - api/users
router.post('/', (req, res, next) => {
  User.findOrCreate({where: req.body})
    .then(([user, bool]) => {
      return user.reload()
        .then(() => res.json({user, bool}))
    })
    .catch(next);
})

//PARAM MIDDLEWARE - api/users/:userId
router.param('userId', (req, res, next, id) => {
  User.findById(id)
    .then(user => {
      if (!user) {
        const err = Error('User not found');
        err.status = 404;
        throw err;
      }
      req.user = user;
      next();
      return null;
    })
    .catch(next);
});

//GET - api/users/:userId
router.get('/:userId', (req, res) => {
  res.json(req.user);
})

//PUT - api/users/:userId
router.put('/:userId', (req, res, next) => {
  req.user.update(req.body)
    .then(user => res.status(200).json(user))
    .catch(next);
});

//DELETE - api/users/:userId
router.delete('/:userId', (req, res, next) => {
  req.user.destroy()
    .then(() => res.status(204).end())
    .catch(next);
})
