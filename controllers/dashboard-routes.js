const router = require('express').Router();
const sequelize = require('../config/connection');
const { Question, User, Answer } = require('../models');
const withAuth = require('../utils/auth');



router.get('/', withAuth , (req, res) => {
  Question.findAll({
    where: {
      // use the ID from the session
      user_id: req.session.user_id
    },
    attributes: [
      'id',
      'content',
      'title',
      'created_at',
      [sequelize.literal('(SELECT COUNT(*) FROM thumbsup WHERE question.id = thumbsup.question_id)'), 'thumbsup_count']
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

router.get('/edit/:id', withAuth, (req, res) => {
  Question.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'content',
      'title',
      'created_at',
      [sequelize.literal('(SELECT COUNT(*) FROM thumbsup WHERE question.id = thumbsup.question_id)'), 'thumbsup_count']
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

      res.render('edit-Question', {
       Question,
       loggedIn: true
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


module.exports = router;