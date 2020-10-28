// import all models
const Question = require('./Question');
const User = require('./User');
const Answer = require('./Answer');
const Thumbsup = require('./Thumbsup');

// ==== USER ASSOCIATIONS ==== //
User.hasMany(Question, {
  foreignKey: 'user_id'
});

User.hasMany(Answer, {
    foreignKey: 'user_id'
  });

// ==== QUESTION ASSOCIATIONS ==== //
Question.belongsTo(User, {
  foreignKey: 'user_id'
});

Question.hasMany(Answer, {
    foreignKey: 'question_id'
  });

// ==== ANSWER ASSOCIATIONS ==== //  
Answer.belongsTo(User, {
  foreignKey: 'user_id'
});

Answer.belongsTo(Question, {
  foreignKey: 'question_id'
});

// ==== THUMBSUP ASSOCIATIONS ==== //
User.belongsToMany(Question, {
    through: Thumbsup,
    as: 'thumbsuped_questions',
    foreignKey: 'user_id'
  });
  
Question.belongsToMany(User, {
through: Thumbsup,
    as: 'thumbsuped_questions',
    foreignKey: 'question_id'
});

Thumbsup.belongsTo(User, {
    foreignKey: 'user_id'
});

Thumbsup.belongsTo(Question, {
    foreignKey: 'question_id'
});

User.hasMany(Thumbsup, {
    foreignKey: 'user_id'
});

Question.hasMany(Thumbsup, {
    foreignKey: 'question_id'
});


module.exports = { User, Question, Answer, Thumbsup };