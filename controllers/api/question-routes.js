const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Question, User, Answer, Thumbsup } = require('../../models');
const withAuth = require('../../utils/auth');


// get all users
router.get('/', (req, res) => {
  console.log('======================');
  Question.findAll({
    attributes: [
      'id',
      'content',
      'title',
      'status',
      'created_at',
      [sequelize.literal('(SELECT COUNT(*) FROM thumbsup WHERE question.id = thumbsup.question_id)'), 'thumbsup_count']
    ],
    order: [['created_at', 'DESC']],
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
    .then(dbQuestionData => res.json(dbQuestionData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  Question.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'content',
      'title',
      'status',
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
        res.status(404).json({ message: 'No question found with this id' });
        return;
      }
      res.json(dbQuestionData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/',withAuth,(req, res) => {
 
  Question.create({
    title: req.body.title,
    content: req.body.content,
    status: req.body.status,
    user_id: req.session.user_id
  })
    .then(dbQuestionData => res.json(dbQuestionData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/upthumbsup',withAuth, (req, res) => {
  // make sure the session exists first
  if (req.session) {
    // pass session id along with all destructured properties on req.body
    Question.upthumbsup({ ...req.body, user_id: req.session.user_id }, { Thumbsup, Answer, User })
      .then(updatedThumbsupData => res.json(updatedThumbsupData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  }
});


router.put('/:id',withAuth, (req, res) => {
  Question.update(
    {
      title: req.body.title,
      status: req.body.status,
      content: req.body.content
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(dbQuestionData => {
      if (!dbQuestionData) {
        res.status(404).json({ message: 'No question found with this id' });
        return;
      }
      res.json(dbQuestionData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id',withAuth, (req, res) => {
  Question.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbQuestionData => {
      if (!dbQuestionData) {
        res.status(404).json({ message: 'No question found with this id' });
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
