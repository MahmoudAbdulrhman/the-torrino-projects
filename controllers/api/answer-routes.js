const router = require('express').Router();
const { Answer } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
  Answer.findAll()
    .then(dbanswerData => res.json(dbanswerData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', withAuth, (req, res) => {
  // check the session
  if (req.session) {
    Answer.create({
      answer_text: req.body.answer_text,
      question_id: req.body.post_id,
      // use the id from the session
      user_id: req.session.user_id
    })
      .then(dbanswerData => res.json(dbanswerData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  }
});

router.delete('/:id', withAuth, (req, res) => {
  Answer.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbanswerData => {
      if (!dbanswerData) {
        res.status(404).json({ message: 'No answer found with this id!' });
        return;
      }
      res.json(dbanswerData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;