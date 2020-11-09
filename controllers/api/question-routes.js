const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Question, User, Answer, Rating } = require('../../models');
const withAuth = require('../../utils/auth');

// get all users
router.get('/', (req, res) => {
  console.log('======================');
  Question.findAll({
    attributes: [
      'id',
      'content',
      'title',
      'created_at',
      'status',
      // [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE question.id = vote.question_id)'), 'vote_count']
    ],
    order: [['created_at', 'DESC']],
    include: [
      {
        model: Answer,
        attributes: ['id', 'answer_text', 'question_id', 'user_id', 'created_at', 'rating'],
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
    .then(dbquestionData => res.json(dbquestionData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', withAuth, (req, res) => {
  Question.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'content',
      'title',
      'created_at',
      'status'
      // [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE question.id = vote.question_id)'), 'vote_count']
    ],
    include: [
      {
        model: Answer,
        attributes: ['id', 'answer_text', 'question_id', 'user_id', 'created_at', 'rating'],
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
    .then(dbquestionData => {
      if (!dbquestionData) {
        res.status(404).json({ message: 'No question found with this id' });
        return;
      }
      res.json(dbquestionData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/question/:id', (req, res) => {
  Question.findOne({
      where: {
          id: req.params.id
      },
      attributes: [
          'id',
          'title',
          'content',
          'created_at',
          'status'
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
      .then(dbquestionData => {
          if (!dbquestionData) {
              res.status(404).json({ message: 'No post found with this id' });
              return;
          }

          const Question = dbquestionData.get({ plain: true });

          res.render('single-question', {
              Question,
              loggedIn: req.session.loggedIn
          });
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
})

router.post('/', withAuth, (req, res) => {
 
  Question.create({
    title: req.body.title,
    content: req.body.content,
    user_id: req.session.user_id
  })
    .then(dbquestionData => res.json(dbquestionData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', withAuth, (req, res) => {
  Question.update(
    {
      title: req.body.title,
      content: req.body.content,
      status: req.body.status
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(dbquestionData => {
      if (!dbquestionData) {
        res.status(404).json({ message: 'No question found with this id' });
        return;
      }
      res.json(dbquestionData);
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
    .then(dbquestionData => {
      if (!dbquestionData) {
        res.status(404).json({ message: 'No question found with this id' });
        return;
      }
      res.json(dbquestionData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
