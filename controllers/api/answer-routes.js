const router = require('express').Router();
const { Answer, Rating, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
  Answer.findAll()
    .then(dbAnswerData => res.json(dbAnswerData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/',withAuth, (req, res) => {
  // check the session
  if (req.session) {
    Answer.create({
      answer_text: req.body.answer_text,
      answer_rating: req.body.answer_rating,
      question_id: req.body.question_id,
      // use the id from the session
      user_id: req.session.user_id
    })
      .then(dbAnswerData => res.json(dbAnswerData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  }
});

router.put('/rating', withAuth, (req, res) => {
  if (req.session) {
    // pass session id along with all destructured properties on req.body
    Post.rating({ ...req.body, user_id: req.session.user_id }, { Rating, Comment, User })
      .then(updatedRatings => res.json(updatedRatings))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  }
});


router.delete('/:id',withAuth, (req, res) => {
  Answer.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbAnswerData => {
      if (!dbAnswerData) {
        res.status(404).json({ message: 'No answer found with this id!' });
        return;
      }
      res.json(dbAnswerData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
