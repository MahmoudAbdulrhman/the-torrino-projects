const router = require('express').Router();
const sequelize = require('../config/connection');
const { Question, User, Answer } = require('../models');
const withAuth = require('../utils/auth');


//put  withAuth,
router.get('/', (req, res) => {
  Question.findAll({
    where: {
      // use the ID from the session
      user_id: req.session.user_id
    },
    attributes: [
      'id',
      'content',
      'title',
      'created_at'
    ],
    include: [
      {
        model: Answer,
        attributes: ['id', 'answer_text', 'question_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbQuestionData => {
      // serialize data before passing to template
      const Questions = dbQuestionData.map(Question => Question.get({ plain: true }));
      res.render('dashboard', { Questions, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
//put  withAuth,
router.get('/edit/:id', (req, res) => {
  Question.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'content',
      'title',
      'created_at'
    ],
    include: [
      {
        model: Answer,
        attributes: ['id', 'answer_text', 'question_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbQuestionData => {
      if (!dbQuestionData) {
        res.status(404).json({ message: 'No Question found with this id' });
        return;
      }

      // serialize the data
      const Question = dbQuestionData.get({ plain: true });

      res.render('edit-question', {
       Question,
       loggedIn: true
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
router.get('/create/', withAuth, (req, res) => {
  Question.findAll({
    where: {
      // use the ID from the session
      user_id: req.session.user_id
    },
    attributes: [
      'id',
      'title',
      'created_at',
      'content'
    ],
    include: [
      {
        model: Answer,
        attributes: ['id', 'answer_text', 'question_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbQuestionData => {
      // serialize data before passing to template
      const questions = dbQuestionData.map(post => post.get({ plain: true }));
      res.render('add-question', { questions, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


module.exports = router;