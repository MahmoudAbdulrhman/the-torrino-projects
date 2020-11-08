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
      const questions = dbQuestionData.map(question => question.get({ plain: true }));
      res.render('dashboard', { questions, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//put  withAuth,
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
        res.status(404).json({ message: 'No Question found with this id' });
        return;
      }

      // serialize the data
      const question = dbQuestionData.get({ plain: true });

      res.render('single-question', {
       question,
       loggedIn: true
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/edit-question/:id', withAuth, (req,res) => {
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
              res.status(404).json({message: 'No post found with this id'});
              return;
          }
          const question = dbQuestionData.get({ plain: true });
          res.render('edit-question', { question, loggedIn: true });
      })
      .catch(err => {
          res.status(500).json(err);
      });
})

router.get('/add/', withAuth, (req, res) => {
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

router.delete('/:id', withAuth, (req, res) => {
  Question.destroy({
      where: {
          id: req.params.id
      }
  })
      .then(dbQuestionData => {
          if (!dbQuestionData) {
              res.status(404).json({ message: 'No post found with this id' });
              return;
          }
          res.json(dbQuestionData);
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});

module.exports = router;