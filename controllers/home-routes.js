const router = require('express').Router();
const sequelize = require('../config/connection');
const { Question, User, Answer } = require('../models');

router.get('/', (req, res) => {
  Question.findAll({
    attributes: [
      'id',
      'content',
      'title',
      'created_at',
      [sequelize.literal('(SELECT COUNT(*) FROM rating WHERE question.id = rating.question_id)'), 'rating_count']
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
      const questions = dbQuestionData.map(question => question.get({ plain: true }));

      // pass a single Question object into the homepage template
      res.render('homepage', {
        questions,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }
  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
      res.redirect('/');
      return;
  }

  res.render('signup');
});

router.get('/question/:id', (req, res) => {
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
        res.status(404).json({ message: 'No question found with this id' });
        return;
      }

      // serialize the data
      const question = dbQuestionData.get({ plain: true });

      // pass data to template
      res.render('single-question', {
        question,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;